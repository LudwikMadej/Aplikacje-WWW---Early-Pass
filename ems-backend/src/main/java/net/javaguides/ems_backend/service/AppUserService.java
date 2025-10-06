package net.javaguides.ems_backend.service;

import net.javaguides.ems_backend.dto.AppUserDto;

import java.util.List;

public interface AppUserService {
    AppUserDto createAppUser(AppUserDto appUserDto);

    AppUserDto getAppUserById(String id);

    List<AppUserDto> getAllAppUsers();

    AppUserDto updateEmployee(String id, AppUserDto updatedAppUserDto);

    void deleteAppUser(String appUserId);

    boolean authenticate(String username, String password);
}
