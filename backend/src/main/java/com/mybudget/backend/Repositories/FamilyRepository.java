package com.mybudget.backend.Repositories;

import com.mybudget.backend.Entities.Family;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FamilyRepository extends JpaRepository<Family, UUID> {

    Optional<Family> findFamilyByName(String name);
    boolean existsByName(String name);

}
