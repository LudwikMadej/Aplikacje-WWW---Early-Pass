package net.javaguides.ems_backend.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.AppUserDto;
import net.javaguides.ems_backend.entity.AppUser;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.mapper.AppUserMapper;
import net.javaguides.ems_backend.repository.AppUserRepository;
import net.javaguides.ems_backend.service.AppUserService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AppUserServiceImpl implements AppUserService {
    private AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public AppUserDto createAppUser(AppUserDto appUserDto) {

        AppUser appUser = AppUserMapper.mapToAppUser(appUserDto);
        System.out.println(appUser.getPassword());
        appUser.setPassword(bCryptPasswordEncoder.encode(appUserDto.getPassword()));
        System.out.println(appUser.getPassword());
        AppUser savedAppUser = appUserRepository.save(appUser);

        return AppUserMapper.mapToAppUserDto(savedAppUser);
    }

    @Override
    public AppUserDto getAppUserById(String id) {
        AppUser appUser = appUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("There's no user with given id: "+id));

        return AppUserMapper.mapToAppUserDto(appUser);
    }

    @Override
    public List<AppUserDto> getAllAppUsers(){

        List<AppUser> appUserList = appUserRepository.findAll();

        return appUserList
                .stream()
                .map(AppUserMapper::mapToAppUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public AppUserDto updateEmployee(String id, AppUserDto updatedAppUserDto) {
        AppUser appUserDto = appUserRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Cannot found user with given id: "+id)
        );

        appUserDto.setLogin(updatedAppUserDto.getLogin());
        if (updatedAppUserDto.getPassword() != "") {
            appUserDto.setPassword(
                    bCryptPasswordEncoder.encode(
                            updatedAppUserDto.getPassword()
                    )
            );
        }
        appUserDto.setEmail(updatedAppUserDto.getEmail());
        appUserDto.setRole(updatedAppUserDto.getRole());

        return AppUserMapper.mapToAppUserDto(appUserRepository.save(appUserDto));
    }

    @Override
    public void deleteAppUser(String appUserId) {
        AppUser appUserDto = appUserRepository.findById(appUserId).orElseThrow(
                () -> new ResourceNotFoundException("Cannot found user with given id: " + appUserId)
        );

        appUserRepository.delete(appUserDto);
    }

    public boolean authenticate(String username, String password){
        Optional<AppUser> appUserOptional = appUserRepository.findById(username);

        if (appUserOptional.isEmpty()){
            throw new ResourceNotFoundException("There's no user with given username: "+username);
        }

        AppUser appUser = appUserOptional.get();

        if (!bCryptPasswordEncoder.matches(password, appUser.getPassword())){
            System.out.println(appUser.getPassword());
            System.out.println(bCryptPasswordEncoder.encode(password));
            System.out.println(password);
            throw new BadCredentialsException("The password is incorrect");
        }

        return true;
    }
}
