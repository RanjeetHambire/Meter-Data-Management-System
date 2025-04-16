package com.seroter.meter_data_management_system.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seroter.meter_data_management_system.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
