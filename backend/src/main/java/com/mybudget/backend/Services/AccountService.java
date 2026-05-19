package com.mybudget.backend.Services;

import com.mybudget.backend.DTOs.*;
import com.mybudget.backend.Entities.Account;
import com.mybudget.backend.Entities.Budget;
import com.mybudget.backend.Enums.BudgetType;
import com.mybudget.backend.Enums.Frequency;
import com.mybudget.backend.Repositories.AccountRepository;
import com.mybudget.backend.Repositories.FamilyRepository;
import com.mybudget.backend.Repositories.BudgetRepository;
import com.mybudget.backend.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    private final AccountRepository accountRepository;
    private final FamilyRepository familyRepository;
    private final BudgetRepository budgetRepository;

    public AccountService(AccountRepository accountRepository, FamilyRepository familyRepository, BudgetRepository budgetRepository) {
        this.accountRepository = accountRepository;
        this.familyRepository = familyRepository;
        this.budgetRepository = budgetRepository;
    }

    public CreateAccountResponseDTO createAccount(CreateAccountDTO accountDTO) {
        var family = familyRepository.findFamilyByName(accountDTO.family()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String encPass = passwordEncoder.encode(accountDTO.password());

        var account = new Account(
            accountDTO.username(),
            accountDTO.email(),
            encPass,
            0,
            family,
            new ArrayList<Budget>()
        );

        var savedAccount = accountRepository.save(account);
        var id = savedAccount.getId();

        String token = tokenService.gerarToken(savedAccount);
        return new CreateAccountResponseDTO(token, id);
    }

    public void editAccount(UUID accountId, EditAccountDTO editAccountDTO) {
        var account = accountRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (editAccountDTO.name() != null) {
            account.setUsername(editAccountDTO.name());
        }

        if (editAccountDTO.password() != null) {
            account.setPassword(editAccountDTO.password());
        }

        accountRepository.save(account);
    }

    public Account getAccountById(UUID accountId) {
        var account = accountRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return account;
    }

    public List<Integer> getAccountSpents(UUID accountId) {
        var account = accountRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        List<Integer> list = new ArrayList<>();
        list.add(0);
        list.add(0);
        list.add(0);
        list.add(0);
        list.add(0);
        //hobby streaming delivery essential occasional
        for (Budget b : account.getBudgets()) {
            int index;
            int current;
            if (b.getType() == BudgetType.HOBBY) {
                index = 0;
                current = list.get(index);
                current += b.getValue();
                list.set(index, current);
            } else if (b.getType() == BudgetType.STREAMING) {
                index = 1;
                current = list.get(index);
                current = current + b.getValue();
                list.set(index, current);
            } else if (b.getType() == BudgetType.DELIVERY) {
                index = 2;
                current = list.get(index);
                current += b.getValue();
                list.set(index, current);
            } else if (b.getType() == BudgetType.ESSENTIAL) {
                if (b.getValue() > 0) {
                    continue;
                }
                index = 3;
                current = list.get(index);
                current += b.getValue();
                list.set(index, current);
            } else if (b.getType() == BudgetType.OCCASIONAL){
                index = 4;
                current = list.get(index);
                current += b.getValue();
                list.set(index, current);
            }
        }

        list.set(0, list.get(0) * -1);
        list.set(1, list.get(1) * -1);
        list.set(2, list.get(2) * -1);
        list.set(3, list.get(3) * -1);
        list.set(4, list.get(4) * -1);

        return list;
    }

    public int getAccountGains(UUID accountId) {
        var account = accountRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        int gain = 0;

        for (Budget b : account.getBudgets()) {
            if (b.getType() == BudgetType.GAIN) {
                gain = gain + b.getValue();
            }
        }

        return gain;
    }

    public MonthlySpentsDTO getAccountMonthlySpents(UUID accountId) {
        var account = accountRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        int currentMonth = Integer.parseInt(Instant.now().toString().split("-")[1]) - 1;

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
                if (budgetMonth == i && b.getType() != BudgetType.GAIN) {
                    spent = spent + (b.getValue() * -1);
                }

                if (budgetMonth < currentMonth && b.getFrequency() != Frequency.OFTEN) {
                    if (!delBudgetsList.contains(b.getId())) {
                       delBudgetsList.add(b.getId());
                    }
                }

            }
            list.set(i, spent);
        }


        account.setSpentPerMonth(list);
        accountRepository.save(account);

        var family = account.getFamily();

        for (UUID id : delBudgetsList) {
            var budget = budgetRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            var value = budget.getValue();

            account.setBalance(account.getBalance() + (-1*value));
            family.setBalance(family.getBalance() + (-1*value));

        }
        budgetRepository.deleteLegacyBudgets();
        accountRepository.save(account);
        familyRepository.save(family);

        var response = new MonthlySpentsDTO(account.getId(), account.getUsername(), list);
        return response;
    }


    public void deleteAccountById(UUID accountId) {
        var acc = accountRepository.findById(accountId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var fam = acc.getFamily();

        fam.setBalance(fam.getBalance() - acc.getBalance());

        familyRepository.save(fam);

        accountRepository.deleteById(acc.getId());
    }

}
