package com.mybudget.backend.Controllers;

import com.mybudget.backend.DTOs.AddBudgetDTO;
import com.mybudget.backend.DTOs.AddBudgetResponseDTO;
import com.mybudget.backend.DTOs.EditBudgetDTO;
import com.mybudget.backend.DTOs.GetBudgetDTO;
import com.mybudget.backend.Services.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/budget")
public class BudgetController {

    private BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<AddBudgetResponseDTO> addBudget(@PathVariable("accountId") String account_id, @RequestBody AddBudgetDTO addBudgetDTO) {
        var budgetId = budgetService.addBudget(UUID.fromString(account_id), addBudgetDTO);

        var responseDTO = new AddBudgetResponseDTO(budgetId);

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{budgetId}")
    public ResponseEntity<GetBudgetDTO> getBudgetById(@PathVariable("budgetId") String budget_id) {
        var budget = budgetService.getBudgetById(UUID.fromString(budget_id));

        var responseDTO = new GetBudgetDTO(budget.getId(), budget.getDescription(), budget.getType(), budget.getFrequency(), budget.getDate(), budget.getValue(), budget.getAuthor().getId());

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{budgetId}")
    public ResponseEntity<Void> editBudgetById(@PathVariable("budgetId") String budget_id, @RequestBody EditBudgetDTO editBudgetDTO) {
        budgetService.editBudgetById(UUID.fromString(budget_id), editBudgetDTO);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{budgetId}")
    public ResponseEntity<Void> deleteBudgetById(@PathVariable("budgetId") String budget_id) {
        budgetService.deleteBudgetById(UUID.fromString(budget_id));

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/expire/{budgetId}")
    public ResponseEntity<Void> expireBudgetById(@PathVariable("budgetId") String budget_id) {
        budgetService.expireBudgetById(UUID.fromString(budget_id));

        return ResponseEntity.ok().build();
    }
}
