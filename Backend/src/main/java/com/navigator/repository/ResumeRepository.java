package com.navigator.repository;

import com.navigator.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findFirstByUserIdOrderByUploadedAtDesc(Long userId);
}