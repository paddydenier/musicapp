package com.paddy.musicapp.band;

import java.util.HashSet;
import java.util.Set;

import com.paddy.musicapp.user.User;

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
@Table(name= "bands")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Band {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;

    @ManyToMany
    @JoinTable(
        name = "band_members",
        joinColumns = @JoinColumn(
            name = "band_id"
        ),
        inverseJoinColumns = @JoinColumn(
            name = "user_id"
        )
    )
    private Set<User> members = new HashSet<>();
}
