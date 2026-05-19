package com.mybudget.backend.DTOs;

public record EditBudgetDTO(String description, String type, String frequency, int value) {
}
