package com.skillifyproject.skillify.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private int courseId;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Column(name = "price")
    private double price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_path")
    private String imagePath;
}