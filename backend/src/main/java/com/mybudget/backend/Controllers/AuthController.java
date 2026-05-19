package com.mybudget.backend.Controllers;

import com.mybudget.backend.DTOs.GetAccountDTO;
import com.mybudget.backend.DTOs.LoginDTO;
import com.mybudget.backend.DTOs.LoginResponseDTO;
import com.mybudget.backend.DTOs.TokenDTO;
import com.mybudget.backend.Entities.Account;
import com.mybudget.backend.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/login")
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password());

        var auth = manager.authenticate(authenticationToken);

        Account acc = (Account) auth.getPrincipal();

        var tokenJWT = tokenService.gerarToken(acc);

        var responseDTO = new LoginResponseDTO(tokenJWT, new GetAccountDTO(acc));
        return ResponseEntity.ok(responseDTO);
    }
}
