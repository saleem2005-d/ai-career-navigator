package com.navigator.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.ZonedDateTime;

@Entity
@Table(name = "resumes")
@Data
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String fileName;
    private String filePath;

    @Column(columnDefinition = "TEXT")
    private String rawText;

    @Column(columnDefinition = "TEXT") // Stores the structured stringified JSON output
    private String parsedJson;

    private Integer atsScore;
    private ZonedDateTime uploadedAt = ZonedDateTime.now();
}
