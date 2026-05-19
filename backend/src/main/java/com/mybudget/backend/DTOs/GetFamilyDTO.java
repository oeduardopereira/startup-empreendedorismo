package com.mybudget.backend.DTOs;

import com.mybudget.backend.Entities.Family;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record GetFamilyDTO(UUID id, String name, int family_balance, List<GetAccountDTO> relatives) {

    public GetFamilyDTO(Family family) {
        this (
            family.getId(),
            family.getName(),
            family.getBalance(),
            family.getRelatives().stream()
                    .map(member -> new GetAccountDTO(member))
                    .collect(Collectors.toList())
        );
    }

}
