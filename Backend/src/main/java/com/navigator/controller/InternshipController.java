package com.navigator.controller;

import com.navigator.model.Resume;
import com.navigator.repository.ResumeRepository;
import com.navigator.repository.UserRepository;
import com.navigator.service.InternshipRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InternshipController {

    private final InternshipRecommendationService recommendationService;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getRecommendations() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            var user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Principal missing"));
            
            Resume contextResume = resumeRepository.findFirstByUserIdOrderByUploadedAtDesc(user.getId())
                    .orElseThrow(() -> new RuntimeException("No active resume data found. Upload a resume first."));

            String recommendationsJson = recommendationService.generateRecommendations(contextResume.getParsedJson());
            return ResponseEntity.ok(recommendationsJson);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Recommendation matrix degradation event: " + e.getMessage());
        }
    }
}