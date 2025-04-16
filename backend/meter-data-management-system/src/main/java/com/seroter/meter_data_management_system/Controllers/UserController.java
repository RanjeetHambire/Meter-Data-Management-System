package com.seroter.meter_data_management_system.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.seroter.meter_data_management_system.DTO.UserDTO;
import com.seroter.meter_data_management_system.Entity.User;
import com.seroter.meter_data_management_system.Services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserDTO userDTO, Authentication authentication) {
        String currentUsername = authentication.getName();
        User creator = userService.getUserByUsername(currentUsername);

        userService.createUser(userDTO, creator.getRole());

        return "User created successfully!";
    }

    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userService.getUserByUsername(username);
}



    
}

