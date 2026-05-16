package com.paddy.musicapp.user;

import java.util.List;

public record UserResponse(
    Long id,
    String firstName,
    String lastName,
    List<String> instruments
) {}
