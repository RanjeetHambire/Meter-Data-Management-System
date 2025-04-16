package com.seroter.meter_data_management_system.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seroter.meter_data_management_system.DTO.UserDTO;
import com.seroter.meter_data_management_system.Entity.User;
import com.seroter.meter_data_management_system.Repository.UserRepository;
// Ensure the Role enum is correctly imported
import com.seroter.meter_data_management_system.Roles.Role;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(UserDTO dto, Role creatorRole) {
        if (!isAuthorizedToCreate(dto.getRole(), creatorRole)) {
            throw new RuntimeException("Not authorized to create this role.");
        }

        User user = new User();
        user.setAdhaarNumber(dto.getAdhaarNumber());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setMobile(dto.getMobile());
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        return userRepository.save(user);
    }

    private boolean isAuthorizedToCreate(Role targetRole, Role creatorRole) {
        if (creatorRole == Role.ADMIN) {
            return targetRole == Role.CONTRACTOR || targetRole == Role.SUPERVISOR;
        } else if (creatorRole == Role.HES) {
            return targetRole == Role.ADMIN;
        }
        return false;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    
    
}

