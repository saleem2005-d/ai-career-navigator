package com.navigator.service.parser;

import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class DocumentParserService {

    public String extractRawText(MultipartFile file) {
        try (InputStream stream = file.getInputStream()) {
            BodyContentHandler handler = new BodyContentHandler(-1); // Disable character bounds limits
            Metadata metadata = new Metadata();
            AutoDetectParser parser = new AutoDetectParser();
            parser.parse(stream, handler, metadata);
            return handler.toString();
        } catch (Exception e) {
            throw new RuntimeException("Document processing pipeline failure: " + e.getMessage(), e);
        }
    }
}
