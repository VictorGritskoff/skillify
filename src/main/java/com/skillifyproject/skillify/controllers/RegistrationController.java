package com.skillifyproject.skillify.controllers;

import com.skillifyproject.skillify.model.Language;
import com.skillifyproject.skillify.model.MyUser;
import com.skillifyproject.skillify.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private MyUserRepository myUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register/user")
    public ResponseEntity<?> createUser(@RequestBody MyUser user) {
        // Проверка наличия пользователя с таким же username в базе данных
        if (myUserRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }

        // Если username уникальный, сохраняем пользователя
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setLanguage(Language.RU);
        user.setRole("ADMIN");
        myUserRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

}