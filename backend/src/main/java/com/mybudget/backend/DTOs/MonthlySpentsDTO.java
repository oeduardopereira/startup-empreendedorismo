package com.mybudget.backend.DTOs;

import java.util.List;
import java.util.UUID;

public record MonthlySpentsDTO(UUID accountId, String username, List<Integer> monthlySpents) {
}
