package com.mybudget.backend.DTOs;

import com.mybudget.backend.Enums.BudgetType;
import com.mybudget.backend.Enums.Frequency;

import java.time.Instant;
import java.util.UUID;

public record GetBudgetDTO(UUID budget_id, String description, BudgetType type, Frequency frequency, Instant date, int value, UUID authorId) {
}
