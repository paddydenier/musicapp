package com.paddy.musicapp.user;

import java.util.ArrayList;
import java.util.List;

import com.paddy.musicapp.instrument.Instrument;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(unique = true)
    private String phoneNumber;
    private String password;

    @ManyToMany
    @JoinTable(
        name = "user_instruments",
        joinColumns = @JoinColumn(
            name = "user_id"
        ),

        inverseJoinColumns = @JoinColumn(
            name = "instrument_id"
        )
    )
    private List<Instrument> instruments = new ArrayList<>();

}