package com.mybudget.backend.Services;

import com.mybudget.backend.DTOs.CreateFamilyDTO;
import com.mybudget.backend.DTOs.EditAccountDTO;
import com.mybudget.backend.DTOs.EditFamilyDTO;
import com.mybudget.backend.DTOs.MonthlySpentsDTO;
import com.mybudget.backend.Entities.Account;
import com.mybudget.backend.Entities.Budget;
import com.mybudget.backend.Entities.Family;
import com.mybudget.backend.Enums.BudgetType;
import com.mybudget.backend.Enums.Frequency;
import com.mybudget.backend.Repositories.AccountRepository;
import com.mybudget.backend.Repositories.BudgetRepository;
import com.mybudget.backend.Repositories.FamilyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FamilyService {

    private FamilyRepository familyRepository;
    private BudgetRepository budgetRepository;
    private AccountRepository accountRepository;

    public FamilyService(FamilyRepository familyRepository, BudgetRepository budgetRepository, AccountRepository accountRepository) {
        this.familyRepository = familyRepository;
        this.budgetRepository = budgetRepository;
        this.accountRepository = accountRepository;
    }

    public UUID createFamily(CreateFamilyDTO createFamilyDTO) {

        var family = new Family(
            createFamilyDTO.name(),
            0,
            new ArrayList<Account>()
        );

        var savedFamily = familyRepository.save(family);

        return savedFamily.getId();
    }

    public void editFamily(UUID familyId, EditFamilyDTO editFamilyDTO) {
        var family = familyRepository.findById(familyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (editFamilyDTO.name() != null) {
            family.setName(editFamilyDTO.name());
        }

        familyRepository.save(family);
    }

    public Family getFamilyById(UUID familyId) {
        var family = familyRepository.findById(familyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return family;

    }

    public List<Family> getAll() {
      return familyRepository.findAll();
    }

    public void deleteFamilyById(UUID familyId) {
        if (familyRepository.existsById(familyId)) {
            familyRepository.deleteById(familyId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public Family getFamilyByName(String familyName) {
        if (familyRepository.existsByName(familyName)) {
            var family = familyRepository.findFamilyByName(familyName).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            return family;
        } else {
            var newFamily = new Family(
                familyName,
                0,
                new ArrayList<Account>()
            );

            var family = familyRepository.save(newFamily);
            return family;
        }
    }

    public List<MonthlySpentsDTO> getFamilyMonthlySpents(UUID familyId) {
        var family = familyRepository.findById(familyId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Instant current = Instant.now();
        int currentMonth = Integer.parseInt(current.toString().split("-")[1]) - 1;

        List<MonthlySpentsDTO> finalList = new ArrayList<>();

        for (Account account : family.getRelatives()) {
            List<UUID> delBudgetsList = new ArrayList<>();
            List<Integer> list = new ArrayList<>();
            for (int j = 0; j < 12; j++) {
                list.add(0);
            }
            for (int i = 0; i < 12; i++) {
                int spent;
                if (i < currentMonth) {
                    spent = account.getSpentPerMonth().get(i);
                } else {
                    spent = 0;
                }
                for (Budget b : account.getBudgets()) {
                    int budgetMonth = Integer.parseInt(b.getDate().toString().split("-")[1]) - 1;
                    if (budgetMonth == i && b.getType() != BudgetType.GAIN && b.getFrequency() == Frequency.ONCE) {
                        spent = spent + (b.getValue() * -1);
                    }

                    if (budgetMonth < currentMonth && b.getFrequency() == Frequency.ONCE && b.getType() != BudgetType.GAIN) {
                        if (!delBudgetsList.contains(b.getId())) {
                            delBudgetsList.add(b.getId());
                        }
                    }

                }
                list.set(i, spent);
            }
            for (Budget mb: account.getBudgets()) {
                int budgetMonth = Integer.parseInt(mb.getDate().toString().split("-")[1]) - 1;
                for (int p = budgetMonth; p <= currentMonth; p++) {
                    if (mb.getType() != BudgetType.GAIN && mb.getFrequency() == Frequency.OFTEN) {
                        var pmSpent = list.get(p);
                        pmSpent = pmSpent + (mb.getValue() * -1);
                        list.set(p, pmSpent);
                        mb.setDate(current);
                        budgetRepository.save(mb);
                    }
                }
            }
            //myBudget2006@.


            account.setSpentPerMonth(list);
            accountRepository.save(account);

            for (UUID id : delBudgetsList) {
                var budget = budgetRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                var value = budget.getValue();

                account.setBalance(account.getBalance() + (-1*value));
                family.setBalance(family.getBalance() + (-1*value));

            }
            budgetRepository.deleteLegacyBudgets();
            accountRepository.save(account);

            var intermediate = new MonthlySpentsDTO(account.getId(), account.getUsername(), list);
            finalList.add(intermediate);
        }
        familyRepository.save(family);
        return finalList;
    }
}
