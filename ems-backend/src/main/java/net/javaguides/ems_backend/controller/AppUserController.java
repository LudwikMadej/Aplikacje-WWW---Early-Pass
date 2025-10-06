package net.javaguides.ems_backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.AppUserDto;
import net.javaguides.ems_backend.entity.AppUser;
import net.javaguides.ems_backend.entity.LoginRequest;
import net.javaguides.ems_backend.service.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class AppUserController {

    private AppUserService appUserService;

    // Saving AppUser
    @PostMapping("create")
    public ResponseEntity<AppUserDto> createAppUser(@RequestBody AppUserDto appUserDto){
        AppUserDto savedAppUserDto = appUserService.createAppUser(appUserDto);

        return new ResponseEntity<>(savedAppUserDto, HttpStatus.CREATED);
    }

    // Getting AppUser
    @GetMapping("get/{id}")
    public ResponseEntity<AppUserDto> getAppUserById(@PathVariable("id") String id){
        return ResponseEntity.ok(appUserService.getAppUserById(id));
    }

    // Getting all users
    @GetMapping("")
    public ResponseEntity<List<AppUserDto>> getAllEmployees(){
        return ResponseEntity.ok(appUserService.getAllAppUsers());
    }

    // Creating/updating user ifnromation
    @PutMapping("update/{id}")
    public ResponseEntity<AppUserDto> updateAppUser(@PathVariable("id") String id,
                                                    @RequestBody AppUserDto appUserDto){
        return ResponseEntity.ok(appUserService.updateEmployee(id, appUserDto));
    }

    // build/delete app user
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAppUser(@PathVariable String id){
        appUserService.deleteAppUser(id);
        return ResponseEntity.ok("AppUser deleted successfully!");
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session){
        System.out.println("dotarło");
        try {
            boolean isAuthenticated = appUserService.authenticate(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
            );

            if (isAuthenticated){
                session.setAttribute("user", loginRequest.getUsername());
                return ResponseEntity.ok("Login was successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occured");
        }
    }
}
