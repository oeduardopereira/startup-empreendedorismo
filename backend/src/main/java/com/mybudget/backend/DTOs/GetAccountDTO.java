package com.mybudget.backend.DTOs;

import com.mybudget.backend.Entities.Account;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record GetAccountDTO(UUID id, String username, String email, int balance, List<Integer> monthlySpents,String family_name, UUID familyId, List<GetBudgetDTO> budgets) {

    public GetAccountDTO(Account account) {
        this(
                account.getId(),
                account.getName(),
                account.getEmail(),
                account.getBalance(),
                account.getSpentPerMonth(),
                account.getFamily().getName(),
                account.getFamily().getId(),
                account.getBudgets().stream().map(budget -> new GetBudgetDTO(budget.getId(), budget.getDescription(), budget.getType(), budget.getFrequency(), budget.getDate(), budget.getValue(), account.getId()))
                        .collect(Collectors.toList())
        );
    }
}
