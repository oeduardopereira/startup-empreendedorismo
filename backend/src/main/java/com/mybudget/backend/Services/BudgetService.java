package com.mybudget.backend.Services;

import com.mybudget.backend.DTOs.AddBudgetDTO;
import com.mybudget.backend.DTOs.EditBudgetDTO;
import com.mybudget.backend.Entities.Budget;
import com.mybudget.backend.Enums.BudgetType;
import com.mybudget.backend.Enums.Frequency;
import com.mybudget.backend.Repositories.AccountRepository;
import com.mybudget.backend.Repositories.BudgetRepository;
import com.mybudget.backend.Repositories.FamilyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class BudgetService {

    private BudgetRepository budgetRepository;
    private AccountRepository accountRepository;
    private FamilyRepository familyRepository;

    public BudgetService(BudgetRepository budgetReposiroty, AccountRepository accountRepository, FamilyRepository familyRepository) {
        this.budgetRepository = budgetReposiroty;
        this.accountRepository = accountRepository;
        this.familyRepository =  familyRepository;
    }

    public UUID addBudget(UUID accountId, AddBudgetDTO addBudgetDTO) {
        var account = accountRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var family = account.getFamily();
        var value = addBudgetDTO.value();
        var type = BudgetType.valueOf(addBudgetDTO.type());

        if (addBudgetDTO.value() > 0) {
            type = BudgetType.GAIN;
        }

        var budget = new Budget(
            addBudgetDTO.description(),
            type,
            Frequency.valueOf(addBudgetDTO.frequency()),
            value,
            account
        );

        var saved_budget = budgetRepository.save(budget);

        account.setBalance(account.getBalance() + value);

        family.setBalance(family.getBalance() + value);

        accountRepository.save(account);
        familyRepository.save(family);

        return saved_budget.getId();
    }

    public Budget getBudgetById(UUID budgetId) {
        var budget = budgetRepository.findById(budgetId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return budget;
    }

    public void editBudgetById(UUID budgetId, EditBudgetDTO editBudgetDTO) {
        var budget = budgetRepository.findById(budgetId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (editBudgetDTO.description() != null) {
            budget.setDescription(editBudgetDTO.description());
        }

        if (editBudgetDTO.frequency() != null) {
            budget.setFrequency(Frequency.valueOf(editBudgetDTO.frequency()));
        }

        if (editBudgetDTO.type() != null) {
            budget.setType(BudgetType.valueOf(editBudgetDTO.type()));
        }

        if (editBudgetDTO.value() != 0) {
            var oldValue = budget.getValue();
            var author = budget.getAuthor();
            var family = author.getFamily();

            author.setBalance(author.getBalance() + (-1*oldValue) + editBudgetDTO.value());
            family.setBalance(family.getBalance() + (-1*oldValue) + editBudgetDTO.value());

            accountRepository.save(author);
            familyRepository.save(family);

            budget.setValue(editBudgetDTO.value());


        }

        budgetRepository.save(budget);

    }

    public void deleteBudgetById(UUID budgetId) {
        var budget = budgetRepository.findById(budgetId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var value = budget.getValue();
        var author = budget.getAuthor();
        var family = author.getFamily();

        budgetRepository.deleteById(budget.getId());

        author.setBalance(author.getBalance() + (-1*value));
        accountRepository.save(author);

        family.setBalance(family.getBalance() + (-1*value));
        familyRepository.save(family);
    }

    public void expireBudgetById(UUID budgetId) {
        if (budgetRepository.existsById(budgetId)) {
            budgetRepository.deleteById(budgetId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
