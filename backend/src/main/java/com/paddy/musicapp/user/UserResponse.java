package com.paddy.musicapp.user;

import java.util.List;

import com.paddy.musicapp.band.BandSummaryResponse;

public record UserResponse(
    Long id,
    String firstName,
    String lastName,
    List<String> instruments,
    List<BandSummaryResponse> bands
) {}
