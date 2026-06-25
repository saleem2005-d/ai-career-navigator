package com.navigator.service;

import com.navigator.service.ai.GeminiIntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternshipRecommendationService {

    private final GeminiIntegrationService aiService;

    private static final String INTERNSHIP_PROMPT = """
        You are an AI placement officer optimized for the Indian employment landscape. Review the user data context payload.
        Formulate personalized matching strategy recommendations targeting top institutions across India, split into distinct buckets:
        1. Tier-1 MNCs (Google, Microsoft, Amazon India)
        2. High-Growth Ecosystem Startups (Bengaluru, Gurgaon, Hyderabad clusters)
        3. Elite Research Labs (IISc, IITs, IIITs)
        
        Output MUST be pure valid JSON without backticks, matching this exact structural interface specification:
        {
          "recommendations": [
            {
               "company": "string",
               "role": "string",
               "category": "MNC / Startup / Research",
               "relevance_score": 95,
               "geographic_anchor": "string",
               "strategic_justification": "string"
            }
          ]
        }
        """;

    public String generateRecommendations(String parsedResumeContextJson) {
        return aiService.orchestrateLLMCall(INTERNSHIP_PROMPT, parsedResumeContextJson);
    }
}