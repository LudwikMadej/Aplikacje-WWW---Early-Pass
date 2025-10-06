package net.javaguides.ems_backend.mapper;

import net.javaguides.ems_backend.dto.AppUserDto;
import net.javaguides.ems_backend.entity.AppUser;

public class AppUserMapper {

    public static AppUserDto mapToAppUserDto(AppUser appUser){
        return new AppUserDto(
                appUser.getPassword(),
                appUser.getLogin(),
                appUser.getEmail(),
                appUser.getRole()
        );
    }

    public static AppUser mapToAppUser(AppUserDto appUser){
        return new AppUser(
                appUser.getPassword(),
                appUser.getLogin(),
                appUser.getEmail(),
                appUser.getRole()
        );
    }
}
