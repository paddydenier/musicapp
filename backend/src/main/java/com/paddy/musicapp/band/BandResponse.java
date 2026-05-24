package com.paddy.musicapp.band;

import java.util.List;

import com.paddy.musicapp.user.UserResponse;

public record BandResponse(
    Long id,
    String name,
    List<UserResponse> members
) {
}
