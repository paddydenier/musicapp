package com.paddy.musicapp.band;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/band/v1")
public class BandController {

    private final BandService bandService;
    @Autowired
    public BandController(BandService bandService) {
        this.bandService = bandService;
    }

    @PostMapping("/addBand")
    public ResponseEntity<Band> addBand(@RequestBody Band band){
        Band savedBand = bandService.addBand(band);
        return ResponseEntity.ok(savedBand);
    }

    @GetMapping("/getBands")
    public ResponseEntity<List<Band>> getBands() {
        List<Band> bands = bandService.getAllBands();
        return ResponseEntity.ok(bands);
    }
}
