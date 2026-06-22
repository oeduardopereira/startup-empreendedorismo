package com.mybudget.backend.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_families")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Family {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "family_id")
    private UUID id;

    @Column(name = "family_name")
    private String name;

    @Column(name = "family_balance")
    private int balance;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "family")
    private List<Account> relatives;
}
