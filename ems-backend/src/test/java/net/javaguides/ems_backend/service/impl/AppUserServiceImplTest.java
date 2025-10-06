package net.javaguides.ems_backend.service.impl;

import net.javaguides.ems_backend.dto.AppUserDto;
import net.javaguides.ems_backend.entity.AppUser;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AppUserServiceImplTest {

    @Mock
    private AppUserRepository appUserRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AppUserServiceImpl appUserService;

    private AppUserDto dto;
    private AppUser user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        dto = new AppUserDto("pass123", "janko", "janko@example.com", "USER");
        user = new AppUser("encoded", "janko", "janko@example.com", "USER");
    }

    @Test
    void testCreateAppUser() {
        when(passwordEncoder.encode("pass123")).thenReturn("encoded");
        when(appUserRepository.save(any(AppUser.class))).thenReturn(user);

        AppUserDto result = appUserService.createAppUser(dto);

        assertThat(result.getPassword()).isEqualTo("encoded");
        verify(appUserRepository).save(any(AppUser.class));
    }

    @Test
    void testGetAppUserByIdFound() {
        when(appUserRepository.findById("janko")).thenReturn(Optional.of(user));

        AppUserDto result = appUserService.getAppUserById("janko");

        assertThat(result.getLogin()).isEqualTo("janko");
    }

    @Test
    void testGetAppUserByIdNotFound() {
        when(appUserRepository.findById("unknown")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> appUserService.getAppUserById("unknown"));
    }

    @Test
    void testGetAllAppUsers() {
        AppUser user2 = new AppUser("encoded2", "maria", "maria@example.com", "MANAGER");
        when(appUserRepository.findAll()).thenReturn(Arrays.asList(user, user2));

        List<AppUserDto> users = appUserService.getAllAppUsers();

        assertThat(users).hasSize(2);
        assertThat(users.get(0).getLogin()).isEqualTo("janko");
        assertThat(users.get(1).getLogin()).isEqualTo("maria");
    }

    @Test
    void testUpdateEmployeeWithPassword() {
        AppUserDto updatedDto = new AppUserDto("newpass", "janko2", "new@example.com", "ADMIN");
        when(appUserRepository.findById("janko")).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newpass")).thenReturn("encodedNew");
        when(appUserRepository.save(any(AppUser.class))).thenReturn(user);

        AppUserDto result = appUserService.updateEmployee("janko", updatedDto);

        assertThat(result.getLogin()).isEqualTo("janko2");
        assertThat(result.getRole()).isEqualTo("ADMIN");
        verify(appUserRepository).save(any(AppUser.class));
    }

    @Test
    void testUpdateEmployeeWithoutPassword() {
        AppUserDto updatedDto = new AppUserDto("", "janko2", "new@example.com", "ADMIN");
        when(appUserRepository.findById("janko")).thenReturn(Optional.of(user));
        when(appUserRepository.save(any(AppUser.class))).thenReturn(user);

        AppUserDto result = appUserService.updateEmployee("janko", updatedDto);

        assertThat(result.getLogin()).isEqualTo("janko2");
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    void testUpdateEmployeeNotFound() {
        when(appUserRepository.findById("unknown")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> appUserService.updateEmployee("unknown", dto));
    }

    @Test
    void testDeleteAppUserFound() {
        when(appUserRepository.findById("janko")).thenReturn(Optional.of(user));

        appUserService.deleteAppUser("janko");

        verify(appUserRepository).delete(user);
    }

    @Test
    void testDeleteAppUserNotFound() {
        when(appUserRepository.findById("unknown")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> appUserService.deleteAppUser("unknown"));
    }

    @Test
    void testAuthenticateSuccess() {
        when(appUserRepository.findById("janko")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("pass123", "encoded")).thenReturn(true);

        boolean result = appUserService.authenticate("janko", "pass123");
        assertThat(result).isTrue();
    }

    @Test
    void testAuthenticateWrongPassword() {
        when(appUserRepository.findById("janko")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "encoded")).thenReturn(false);

        assertThrows(BadCredentialsException.class,
                () -> appUserService.authenticate("janko", "wrong"));
    }

    @Test
    void testAuthenticateUserNotFound() {
        when(appUserRepository.findById("unknown")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> appUserService.authenticate("unknown", "pass123"));
    }
}
