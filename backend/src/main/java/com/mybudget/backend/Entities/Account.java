package com.mybudget.backend.Entities;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="tb_accounts")
public class Account implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "account_id")
    private UUID id;

    @Column(name = "account_username")
    private String username;

    @Column(name = "account_email")
    private String email;

    @Column(name = "account_password")
    private String password;

    @Column(name = "account_balance")
    private int balance;

    @Column(name = "account_monthly_spent")
    private List<Integer> spentPerMonth;

    @ManyToOne
    @PrimaryKeyJoinColumn
    @JoinColumn(name = "account_family")
    private Family family;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "author")
    private List<Budget> budgets;

    public Account() {}

    public Account(String username, String email, String password, int balance, Family family, List<Budget> budgets) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.family = family;
        this.balance = balance;
        this.budgets = budgets;
        this.spentPerMonth = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            spentPerMonth.add(0);
        }
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPass() {
        return password;
    }

    public int getBalance() {
        return balance;
    }

    public List<Integer> getSpentPerMonth() {
        return spentPerMonth;
    }

    public Family getFamily() {
        return family;
    }

    public List<Budget> getBudgets() {
        return budgets;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public void setSpentPerMonth(List<Integer> spentPerMonth) {
        this.spentPerMonth = spentPerMonth;
    }

    public void setFamily(Family family) {
        this.family = family;
    }

    public void setBudgets(List<Budget> budgets) {
        this.budgets = budgets;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}

//Fazer a entity dos budgets e todos os trâmites relacionados.