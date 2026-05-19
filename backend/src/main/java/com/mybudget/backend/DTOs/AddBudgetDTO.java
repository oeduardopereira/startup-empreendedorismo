package com.mybudget.backend.DTOs;

public record AddBudgetDTO(String description, String type, String frequency, int value) {
}
