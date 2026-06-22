package com.mybudget.backend.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="tb_accounts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    public String getName() { return this.username; }

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