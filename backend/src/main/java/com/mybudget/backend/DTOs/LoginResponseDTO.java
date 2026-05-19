package com.mybudget.backend.DTOs;

public record LoginResponseDTO(String token, GetAccountDTO account) {
}
