package com.mybudget.backend.security;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.mybudget.backend.Entities.Account;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Account account) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);

            return JWT.create().withIssuer("MyBudgetAPI").withSubject(account.getEmail())
                    .withExpiresAt(dataExpiracao()).sign(algoritmo);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar JWT", exception);
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

    public String getSubject(String tokenJWT) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm).withIssuer("MyBudgetAPI").build().verify(tokenJWT).getSubject();
        } catch (JWTVerificationException exception) {
            System.out.println("Token inválido ou expirado.");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

}
