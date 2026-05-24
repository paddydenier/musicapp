package com.paddy.musicapp.instrument;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstrumentService {
    @Autowired
    InstrumentRepository instrumentRepository;
    public Instrument addInstrument(Instrument instrument) {
        return instrumentRepository.save(instrument);
    }
    public List<Instrument> getAllInstruments() {
        return instrumentRepository.findAll();
    }
}
