package com.paddy.musicapp.band;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/band/v1")
public class BandController {

    private final BandService bandService;

    @Autowired
    public BandController(BandService bandService) {
        this.bandService = bandService;
    }

    @PostMapping("/addBand")
    public ResponseEntity<BandResponse> addBand(
            @RequestBody Band band) {

        BandResponse savedBand =
                bandService.addBand(band);

        return ResponseEntity.ok(savedBand);
    }

    @GetMapping("/getBands")
    public ResponseEntity<List<BandResponse>> getBands() {

        List<BandResponse> bands =
                bandService.getAllBands();

        return ResponseEntity.ok(bands);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeBand(
            @PathVariable Long id) {

        bandService.removeBand(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{bandId}/members/{userId}")
    public ResponseEntity<BandResponse> addMember(
            @PathVariable Long bandId,
            @PathVariable Long userId) {

        BandResponse updatedBand =
                bandService.addMember(bandId, userId);

        return ResponseEntity.ok(updatedBand);
    }

    @DeleteMapping("/{bandId}/members/{userId}")
    public ResponseEntity<BandResponse> removeMember(
            @PathVariable Long bandId,
            @PathVariable Long userId) {

        BandResponse updatedBand =
                bandService.removeMember(bandId, userId);

        return ResponseEntity.ok(updatedBand);
    }
}