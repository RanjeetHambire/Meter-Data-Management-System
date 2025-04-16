package com.seroter.meter_data_management_system.DTO;

import com.seroter.meter_data_management_system.Roles.Role;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    
    @NotBlank
    private String adhaarNumber;

    @NotBlank
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "\\d{10}")
    private String mobile;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private Role role;
}
