package com.navigator.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.ZonedDateTime;

@Entity
@Table(name = "skill_gaps")
@Data
public class SkillGap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String targetRole;
    private Integer matchPercentage;

    @Column(columnDefinition = "TEXT") // Stores missing technical and soft skills as text data
    private String missingSkills;

    @Column(columnDefinition = "TEXT") // Stores the generated personalized learning roadmap steps
    private String learningRoadmap;

    private ZonedDateTime analyzedAt = ZonedDateTime.now();
}