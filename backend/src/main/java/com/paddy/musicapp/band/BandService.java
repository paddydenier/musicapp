package com.paddy.musicapp.band;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paddy.musicapp.user.User;
import com.paddy.musicapp.user.UserRepository;
import com.paddy.musicapp.user.UserResponse;

@Service
public class BandService {

    @Autowired
    BandRepository bandRepository;

    @Autowired
    UserRepository userRepository;

    public BandResponse addBand(Band band) {

        return mapToResponse(
            bandRepository.save(band)
        );
    }

    public void removeBand(Long id) {

        bandRepository.deleteById(id);
    }

    public List<BandResponse> getAllBands() {

        return bandRepository.findAll()
            .stream()
            .map(this::mapToResponse)
            .toList();
    }

    public BandResponse addMember(Long bandId, Long userId) {

        Band band = bandRepository.findById(bandId)
            .orElseThrow();

        User user = userRepository.findById(userId)
            .orElseThrow();

        boolean alreadyMember = band.getMembers()
            .stream()
            .anyMatch(member -> member.getId().equals(userId));

        if (!alreadyMember) {
            band.getMembers().add(user);
        }

        return mapToResponse(
            bandRepository.save(band)
        );
    }

    public BandResponse removeMember(Long bandId, Long userId) {

        Band band = bandRepository.findById(bandId)
            .orElseThrow();

        band.getMembers().removeIf(
            user -> user.getId().equals(userId)
        );

        return mapToResponse(
            bandRepository.save(band)
        );
    }

    private UserResponse mapUserToResponse(User user) {

        List<String> instruments = user.getInstruments()
            .stream()
            .map(instrument -> instrument.getName())
            .toList();

        List<BandSummaryResponse> bands = user.getBands()
            .stream()
            .map(band -> new BandSummaryResponse(
                band.getId(),
                band.getName()
            ))
            .toList();

        return new UserResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            instruments,
            bands
        );
    }

    private BandResponse mapToResponse(Band band) {

        List<UserResponse> members = band.getMembers()
            .stream()
            .map(this::mapUserToResponse)
            .toList();

        return new BandResponse(
            band.getId(),
            band.getName(),
            members
        );
    }
}