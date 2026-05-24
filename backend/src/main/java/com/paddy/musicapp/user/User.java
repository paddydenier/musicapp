package com.paddy.musicapp.user;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.paddy.musicapp.band.Band;
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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
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

    @JsonIgnore
    @ManyToMany(mappedBy = "members")
    private Set<Band> bands = new HashSet<>();

}