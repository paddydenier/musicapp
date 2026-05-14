package com.paddy.musicapp.instrument;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instruments")
public class InstrumentController {

    private final InstrumentRepository repo;

    public InstrumentController(InstrumentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Instrument> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Instrument create(@RequestBody Instrument instrument) {
        return repo.save(instrument);
    }
}