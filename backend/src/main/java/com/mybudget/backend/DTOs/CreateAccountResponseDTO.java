package com.mybudget.backend.DTOs;

import java.util.UUID;

public record CreateAccountResponseDTO(String token, UUID account_id) {
}
