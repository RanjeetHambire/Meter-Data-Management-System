package com.seroter.meter_data_management_system.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seroter.meter_data_management_system.Entity.Consumer;

public interface ConsumerRepository extends JpaRepository<Consumer, Long> {

}
