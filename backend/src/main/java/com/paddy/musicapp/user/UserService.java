package com.paddy.musicapp.user;

import java.util.List;

import org.springframework.stereotype.Service;

import com.paddy.musicapp.band.BandSummaryResponse;
import com.paddy.musicapp.instrument.Instrument;
import com.paddy.musicapp.instrument.InstrumentRepository;

@Service
public class UserService {

    UserRepository userRepository;
    InstrumentRepository instrumentRepository;

    public UserService(
            UserRepository userRepository,
            InstrumentRepository instrumentRepository) {

        this.userRepository = userRepository;
        this.instrumentRepository = instrumentRepository;
    }

    public User addUser(User user) {

        return userRepository.save(user);
    }

    public User addInstrumentToUser(
            Long userId,
            Long instrumentId
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        Instrument instrument = instrumentRepository
                .findById(instrumentId)
                .orElseThrow();

        user.getInstruments().add(instrument);

        return userRepository.save(user);
    }

    public User removeInstrumentFromUser(
            Long userId,
            Long instrumentId
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow();

        Instrument instrument = instrumentRepository
                .findById(instrumentId)
                .orElseThrow();

        user.getInstruments().remove(instrument);

        return userRepository.save(user);
    }

    public List<UserResponse> getUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> {

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
                })
                .toList();
    }
}