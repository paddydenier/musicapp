package com.paddy.musicapp.instrument;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/instrument/v1")
public class InstrumentController {

    private final InstrumentService instrumentService;
    @Autowired
    public InstrumentController(InstrumentService instrumentService) {
        this.instrumentService = instrumentService;
    }

    @PostMapping("/addInstrument")
    public ResponseEntity<Instrument> addInstrument(@RequestBody Instrument instrument) {
        Instrument savedInstrument = instrumentService.addInstrument(instrument);
        return ResponseEntity.ok(savedInstrument);
    }

    @GetMapping("/getInstruments")
    public ResponseEntity<List<Instrument>> getInstruments() {
        List<Instrument> instruments = instrumentService.getAllInstruments();
        return ResponseEntity.ok(instruments);
    }
}