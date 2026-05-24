package com.paddy.musicapp.auth;

import com.paddy.musicapp.user.User;
import com.paddy.musicapp.user.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthController(
        UserRepository userRepository,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        User user = userRepository
                .findByUsername(request.username())
                .orElseThrow();

        if (!user.getPassword().equals(request.password())) {
            return ResponseEntity.status(401).build();
        }

        String token =
            jwtService.generateToken(user.getUsername());

        return ResponseEntity.ok(
            new LoginResponse(
                token,
                user.getId(),
                user.getUsername()
            )
        );
    }
}