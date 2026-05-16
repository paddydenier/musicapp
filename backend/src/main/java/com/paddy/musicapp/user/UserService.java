package com.paddy.musicapp.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paddy.musicapp.instrument.Instrument;
import com.paddy.musicapp.instrument.InstrumentRepository;

@Service
public class UserService {

    UserRepository userRepository;
    InstrumentRepository instrumentRepository;
    public UserService(UserRepository userRepository, InstrumentRepository instrumentRepository) {
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
            .map(user -> new UserResponse(

                    user.getId(),

                    user.getFirstName(),

                    user.getLastName(),

                    user.getInstruments()
                            .stream()
                            .map(instrument ->
                                    instrument.getName())
                            .toList()

            ))
            .toList();
    } 
}
