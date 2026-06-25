package com.navigator.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.ZonedDateTime;

@Entity 
@Table(name = "users") 
@Data
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email; 
    
    @Column(nullable = false)
    private String password; 
    
    private String firstName; 
    private String lastName; 
    private String role;
    private ZonedDateTime createdAt = ZonedDateTime.now();
}