package com.mybudget.backend;

import com.mybudget.backend.Entities.Family;
import com.mybudget.backend.Entities.Account;
import com.mybudget.backend.Repositories.AccountRepository;
import com.mybudget.backend.Repositories.BudgetRepository;
import com.mybudget.backend.Repositories.FamilyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final BudgetRepository budgetRepository;
    private final FamilyRepository familyRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("======= SEEDER INICIANDO =======");

        var families = familyRepository.findAll();

        if (!families.isEmpty()) {
            log.info("Banco de dados já iniciado.");
            return;
        }

        var familia = Family.builder().name("Teste").balance(0).build();

        familyRepository.save(familia);

        log.info("\n- Família: teste\nBalanço: 0\ninicial: 0");

        var acc1 = Account.builder().email("teste@gmail.com")
                .password(passwordEncoder.encode("senha"))
                .family(familia)
                .username("teste")
                .balance(0)
                .spentPerMonth(new ArrayList<>(12))
                .budgets(new ArrayList<>())
                .build();

        var acc2 = Account.builder().email("teste2@gmail.com")
                .password(passwordEncoder.encode("senha"))
                .family(familia)
                .username("teste2")
                .balance(0)
                .spentPerMonth(new ArrayList<>(12))
                .budgets(new ArrayList<>())
                .build();

        accountRepository.save(acc1);
        accountRepository.save(acc2);

        log.info("\n===\n- Conta criada:\nUsername: teste\nemail: teste@gmail.com\nsenha: senha\n===");
        log.info("\n===\n- Conta criada:\nUsername: teste2\nemail: teste2@gmail.com\nsenha: senha\n===");

        log.info(" ======= SEEDING FINALIZADO =======");
    }

}
