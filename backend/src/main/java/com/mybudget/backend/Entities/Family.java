package com.mybudget.backend.Entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_families")
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

    public Family() {}

    public Family(String name, int balance, List<Account> relatives) {
        this.name = name;
        this.relatives = relatives;
        this.balance = balance;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getBalance() {
        return balance;
    }

    public List<Account> getRelatives() {
        return relatives;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public void setRelatives(List<Account> relatives) {
        this.relatives = relatives;
    }
}
