package com.mybudget.backend.Repositories;

import com.mybudget.backend.Entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {

    UserDetails findByEmail(String email);

}
