package com.navigator.controller;

import com.navigator.model.Resume;
import com.navigator.model.User;
import com.navigator.repository.ResumeRepository;
import com.navigator.repository.UserRepository;
import com.navigator.service.ai.GeminiIntegrationService;
import com.navigator.service.parser.DocumentParserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResumeController {

    private final DocumentParserService parserService;
    private final GeminiIntegrationService aiService;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    private static final String PARSE_SYSTEM_PROMPT = """
        You are an advanced enterprise ATS processing matrix. Review the raw string input extraction data from a candidate resume file.
        Output MUST be valid, pure JSON without any backticks, matching this schema exactly:
        {
          "skills": ["string"],
          "education": [{"degree": "string", "institution": "string", "year": "string"}],
          "experience": [{"role": "string", "company": "string", "duration": "string"}],
          "ats_score": 85,
          "actionable_improvements": ["string"]
        }
        """;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Context Identification Error."));

            String extractedRawText = parserService.extractRawText(file);
            String jsonAnalysisResult = aiService.orchestrateLLMCall(PARSE_SYSTEM_PROMPT, extractedRawText);

            Resume resume = new Resume();
            resume.setUser(user);
            resume.setFileName(file.getOriginalFilename());
            resume.setFilePath("/var/storage/resumes/" + file.getOriginalFilename());
            resume.setRawText(extractedRawText);
            resume.setParsedJson(jsonAnalysisResult);
            resume.setAtsScore(85); 

            Resume savedResume = resumeRepository.save(resume);
            return ResponseEntity.ok(savedResume);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload pipeline execution failure: " + e.getMessage());
        }
    }
}