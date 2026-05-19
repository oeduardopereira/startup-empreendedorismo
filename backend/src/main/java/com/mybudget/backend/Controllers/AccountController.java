package com.mybudget.backend.Controllers;

import com.mybudget.backend.DTOs.*;
import com.mybudget.backend.Services.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/v1/account")
public class AccountController {

    private AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<CreateAccountResponseDTO> createAccount(@RequestBody CreateAccountDTO createAccountDTO) {
        var responseDTO = accountService.createAccount(createAccountDTO);

        return ResponseEntity.created(URI.create("/v1/account/" + responseDTO.account_id().toString())).body(responseDTO);
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<Void> editAccount(@PathVariable("accountId") String id, @RequestBody EditAccountDTO editAccountDTO) {
        accountService.editAccount(UUID.fromString(id), editAccountDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<GetAccountDTO> getAccountById(@PathVariable("accountId") String id) {
        var account = accountService.getAccountById(UUID.fromString(id));

        var responseDTO = new GetAccountDTO(account);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/spents/{accountId}")
    public ResponseEntity<SpentsDTO> getAccountSpents(@PathVariable("accountId") String id) {
        var spents = accountService.getAccountSpents(UUID.fromString(id));


        var responseDTO = new SpentsDTO(spents);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/gains/{accountId}")
    public ResponseEntity<GainsDTO> getAccountGains(@PathVariable("accountId") String id) {
        var gains = accountService.getAccountGains(UUID.fromString(id));


        var responseDTO = new GainsDTO(gains);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/month-spents/{accountId}")
    public ResponseEntity<MonthlySpentsDTO> getAccountMonthlySpents(@PathVariable("accountId") String id) {
        var spents = accountService.getAccountMonthlySpents(UUID.fromString(id));

        return ResponseEntity.ok(spents);
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccountById(@PathVariable("accountId") String id) {
        accountService.deleteAccountById(UUID.fromString(id));

        return ResponseEntity.ok().build();
    }

}
