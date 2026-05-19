package com.mybudget.backend.Repositories;

import com.mybudget.backend.Entities.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface BudgetRepository extends JpaRepository<Budget, UUID> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tb_budgets WHERE budget_date < date_trunc('month', current_date) AND budget_frequency = 0", nativeQuery = true)
    void deleteLegacyBudgets();
}