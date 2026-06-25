package com.navigator.service.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiIntegrationService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

    public String orchestrateLLMCall(String customSystemPrompt, String inputData) {
        String directEndpoint = GEMINI_URL + apiKey;
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String dynamicPayload = """
        {
          "contents": [{
            "parts":[{
              "text": "%s \\n\\n Context Input Payload: \\n %s"
            }]
          }],
          "generationConfig": {
            "temperature": 0.1,
            "responseMimeType": "application/json"
          }
        }
        """.formatted(escapeJson(customSystemPrompt), escapeJson(inputData));

        HttpEntity<String> entity = new HttpEntity<>(dynamicPayload, headers);
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(directEndpoint, entity, Map.class);
            List<Map> candidates = (List<Map>) response.getBody().get("candidates");
            Map content = (Map) candidates.get(0).get("content");
            List<Map> parts = (List<Map>) content.get("parts");
            return parts.get(0).get("text").toString();
        } catch (Exception e) {
            throw new RuntimeException("Downstream Generative Gateway timeout or schema validation failure: " + e.getMessage(), e);
        }
    }

    private String escapeJson(String rawText) {
        if (rawText == null) return "";
        return rawText.replace("\\", "\\\\")
                      .replace("\"", "\\\"")
                      .replace("\b", "\\b")
                      .replace("\f", "\\f")
                      .replace("\n", "\\n")
                      .replace("\r", "\\r")
                      .replace("\t", "\\t");
    }
}