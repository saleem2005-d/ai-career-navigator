package com.navigator.controller;

import com.navigator.model.SkillGap;
import com.navigator.service.SkillGapAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analysis")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SkillGapController {

    private final SkillGapAnalysisService gapAnalysisService;

    @PostMapping("/gap")
    public ResponseEntity<?> computeSkillGap(@RequestParam("targetRole") String targetRole) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            SkillGap analysisResult = gapAnalysisService.executeAnalysis(targetRole, email);
            return ResponseEntity.ok(analysisResult);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Skill gap processing matrix error: " + e.getMessage());
        }
    }
}