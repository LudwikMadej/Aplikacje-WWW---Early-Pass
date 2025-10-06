package net.javaguides.ems_backend.mapper;

import net.javaguides.ems_backend.dto.AppUserDto;
import net.javaguides.ems_backend.entity.AppUser;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AppUserMapperTest {

    @Test
    void testMapToAppUserDto() {
        AppUser user = new AppUser("pass123", "janko", "janko@example.com", "USER");

        AppUserDto dto = AppUserMapper.mapToAppUserDto(user);

        assertThat(dto.getPassword()).isEqualTo("pass123");
        assertThat(dto.getLogin()).isEqualTo("janko");
        assertThat(dto.getEmail()).isEqualTo("janko@example.com");
        assertThat(dto.getRole()).isEqualTo("USER");
    }

    @Test
    void testMapToAppUser() {
        AppUserDto dto = new AppUserDto("pass123", "janko", "janko@example.com", "USER");

        AppUser user = AppUserMapper.mapToAppUser(dto);

        assertThat(user.getPassword()).isEqualTo("pass123");
        assertThat(user.getLogin()).isEqualTo("janko");
        assertThat(user.getEmail()).isEqualTo("janko@example.com");
        assertThat(user.getRole()).isEqualTo("USER");
    }
}
