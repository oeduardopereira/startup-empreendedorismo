package com.mybudget.backend.Entities;

import com.mybudget.backend.Enums.BudgetType;
import com.mybudget.backend.Enums.Frequency;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tb_budgets")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
}
