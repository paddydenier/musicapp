package com.paddy.musicapp.band;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BandService {
    @Autowired
    BandRepository bandRepository;
    public Band addBand(Band band) {
        return bandRepository.save(band);
    }
    public void removeBand(Long id) {
        bandRepository.deleteById(id);
    }
    public List<Band> getAllBands() {
        return bandRepository.findAll();
    }
   
    // addMember
    // removeMember

}
