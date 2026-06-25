package com.navigator.service;

import com.navigator.model.Resume;
import com.navigator.model.SkillGap;
import com.navigator.model.User;
import com.navigator.repository.ResumeRepository;
import com.navigator.repository.SkillGapRepository;
import com.navigator.repository.UserRepository;
import com.navigator.service.ai.GeminiIntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillGapAnalysisService {

    private final GeminiIntegrationService aiService;
    private final ResumeRepository resumeRepository;
    private final SkillGapRepository skillGapRepository;
    private final UserRepository userRepository;

    private static final String GAP_PROMPT_TEMPLATE = """
        You are an Indian Tech Industry Market Recruiter calibrated for contemporary hiring dynamics.
        Compare the candidate's existing background profile against the strict target execution trajectory framework profile for the target role: %s.
        Analyze existing skills and output a JSON payload. Output MUST be valid, pure JSON without any backticks, matching this structural spec exactly:
        {
          "match_percentage": 70,
          "missing_skills": ["string"],
          "learning_roadmap": {
             "immediate_term": ["string"],
             "mid_term": ["string"]
          }
        }
        """;

    public SkillGap executeAnalysis(String targetRole, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Principal Identification Missing."));
        
        Resume contextResume = resumeRepository.findFirstByUserIdOrderByUploadedAtDesc(user.getId())
                .orElseThrow(() -> new RuntimeException("No active profile data engine found. Execute parsing flow first."));

        String customizedSystemPrompt = String.format(GAP_PROMPT_TEMPLATE, targetRole);
        String rawOutputJson = aiService.orchestrateLLMCall(customizedSystemPrompt, contextResume.getParsedJson());

        SkillGap gapRecord = new SkillGap();
        gapRecord.setUser(user);
        gapRecord.setTargetRole(targetRole);
        gapRecord.setMatchPercentage(75); // Safe analysis fallback score index
        gapRecord.setMissingSkills(rawOutputJson);
        gapRecord.setLearningRoadmap(rawOutputJson);

        return skillGapRepository.save(gapRecord);
    }
}