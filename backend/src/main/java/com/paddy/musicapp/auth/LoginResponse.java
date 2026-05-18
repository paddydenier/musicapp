package com.paddy.musicapp.auth;

public record LoginResponse(
    String token, 
    Long userId,
    String username
) {
}
