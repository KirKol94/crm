package ru.castroy10.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.castroy10.backend.dto.appuser.AppUserLoginDto;
import ru.castroy10.backend.dto.appuser.AppUserRegisterDto;
import ru.castroy10.backend.dto.appuser.AppUserUpdateDto;
import ru.castroy10.backend.exception.RollbackException;
import ru.castroy10.backend.security.jwt.JwtUtil;
import ru.castroy10.backend.service.AppUserService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;

    public UserController(JwtUtil jwtUtil, AuthenticationManager authenticationManager, AppUserService appUserService) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AppUserLoginDto appUserLoginDto) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(appUserLoginDto.getUsername(), appUserLoginDto.getPassword());
        try {
            authenticationManager.authenticate(auth);
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(Map.of("Login or password incorrect", e.toString()));
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(Map.of("Token", jwtUtil.generateToken(appUserLoginDto.getUsername())));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AppUserRegisterDto appUserRegisterDto) {
        try {
            return appUserService.register(appUserRegisterDto);
        } catch (RollbackException e) {
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }
    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Valid AppUserUpdateDto appUserUpdateDto){
        return appUserService.update(appUserUpdateDto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok().body(Map.of("Refresh token", jwtUtil.refreshToken(httpServletRequest)));
    }
}