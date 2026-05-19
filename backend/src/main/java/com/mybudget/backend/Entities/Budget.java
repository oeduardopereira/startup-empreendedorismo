package com.mybudget.backend.Entities;

import com.mybudget.backend.Enums.BudgetType;
import com.mybudget.backend.Enums.Frequency;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tb_budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "budget_id")
    private UUID id;

    @Column(name = "budget_description")
    private String description;

    @Column(name = "budget_type")
    private BudgetType type;

    @Column(name = "budget_frequency")
    private Frequency frequency;

    @Column(name = "budget_value")
    private int value;

    @Column(name = "budget_date")
    private Instant date;

    @PrePersist
    public void onPrePersist() {
        this.date = Instant.now();
    }

    @ManyToOne
    @PrimaryKeyJoinColumn
    @JoinColumn(name = "budget_author")
    private Account author;

    public Budget() {}

    public Budget(String description, BudgetType type, Frequency frequency, int value, Account author) {
        this.description = description;
        this.type = type;
        this.frequency = frequency;
        this.value = value;
        this.author = author;
    }

    public UUID getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public BudgetType getType() {
        return type;
    }

    public Frequency getFrequency() {
        return frequency;
    }

    public int getValue() {
        return value;
    }

    public Instant getDate() {
        return date;
    }

    public Account getAuthor() {
        return author;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setType(BudgetType type) {
        this.type = type;
    }

    public void setFrequency(Frequency frequency) {
        this.frequency = frequency;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public void setAuthor(Account author) {
        this.author = author;
    }
}
