package com.navigator.repository;

import com.navigator.model.SkillGap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillGapRepository extends JpaRepository<SkillGap, Long> {
    List<SkillGap> findByUserIdOrderByAnalyzedAtDesc(Long userId);
}
