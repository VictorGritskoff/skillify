package com.skillifyproject.skillify.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//TODO почему происходит авторизация и Alex и alex

@Controller
public class AuthController {

    @GetMapping("admin/home")
    public String handleHome() {
        return "home";
    }

    @GetMapping("/analytics")
    public String handleAnalytics() {
        return "analytics";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "signup";
    }
}
