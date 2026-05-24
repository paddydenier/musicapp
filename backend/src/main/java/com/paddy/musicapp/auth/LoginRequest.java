package com.paddy.musicapp.auth;

public record LoginRequest(
    String username,
    String password
) {
}
