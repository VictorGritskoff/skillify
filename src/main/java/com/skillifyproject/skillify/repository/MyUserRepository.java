package com.skillifyproject.skillify.repository;

import com.skillifyproject.skillify.model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByUsername(String username);
    Optional<MyUser> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
