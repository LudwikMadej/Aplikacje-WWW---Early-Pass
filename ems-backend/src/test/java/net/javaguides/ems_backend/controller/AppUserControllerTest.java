package net.javaguides.ems_backend.controller;

import net.javaguides.ems_backend.dto.AppUserDto;
import net.javaguides.ems_backend.entity.LoginRequest;
import net.javaguides.ems_backend.service.AppUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpSession;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class AppUserControllerTest {

    @Mock
    private AppUserService appUserService;

    @Mock
    private HttpSession session;

    @InjectMocks
    private AppUserController appUserController;

    private AppUserDto userDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userDto = new AppUserDto();
        userDto.setLogin("testuser");
    }

    @Test
    void testCreateAppUser() {
        when(appUserService.createAppUser(any(AppUserDto.class))).thenReturn(userDto);

        ResponseEntity<AppUserDto> response = appUserController.createAppUser(userDto);

        assertThat(response.getBody().getLogin()).isEqualTo("testuser");
        assertThat(response.getStatusCodeValue()).isEqualTo(201);
    }

    @Test
    void testGetAppUserById() {
        when(appUserService.getAppUserById("testuser")).thenReturn(userDto);

        ResponseEntity<AppUserDto> response = appUserController.getAppUserById("testuser");

        assertThat(response.getBody().getLogin()).isEqualTo("testuser");
        verify(appUserService, times(1)).getAppUserById("testuser");
    }

    @Test
    void testGetAllEmployees() {
        when(appUserService.getAllAppUsers()).thenReturn(Arrays.asList(userDto));

        ResponseEntity<List<AppUserDto>> response = appUserController.getAllEmployees();

        assertThat(response.getBody()).hasSize(1);
        verify(appUserService).getAllAppUsers();
    }

    @Test
    void testDeleteAppUser() {
        doNothing().when(appUserService).deleteAppUser("1");

        ResponseEntity<String> response = appUserController.deleteAppUser("1");

        assertThat(response.getBody()).isEqualTo("AppUser deleted successfully!");
        verify(appUserService).deleteAppUser("1");
    }

    @Test
    void testLoginSuccessful() {
        LoginRequest req = new LoginRequest();
        req.setUsername("test");
        req.setPassword("1234");

        when(appUserService.authenticate("test", "1234")).thenReturn(true);

        ResponseEntity<String> response = appUserController.login(req, session);

        assertThat(response.getBody()).isEqualTo("Login was successful");
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    void testLoginInvalidCredentials() {
        LoginRequest req = new LoginRequest();
        req.setUsername("bad");
        req.setPassword("wrong");

        when(appUserService.authenticate("bad", "wrong")).thenReturn(false);

        ResponseEntity<String> response = appUserController.login(req, session);

        assertThat(response.getStatusCodeValue()).isEqualTo(401);
        assertThat(response.getBody()).contains("Invalid username");
    }
}
