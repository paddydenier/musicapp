package com.paddy.musicapp.user;

import com.paddy.musicapp.instrument.Instrument;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @ManyToMany
    @JoinTable(
        name = "user_instruments",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "instrument_id")
    )
    private List<Instrument> instruments;

    public User() {}

    public User(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public List<Instrument> getInstruments() {
        return instruments;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setInstruments(List<Instrument> instruments) {
        this.instruments = instruments;
    }
}