package com.seroter.meter_data_management_system.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seroter.meter_data_management_system.Entity.Consumer;

public interface ConsumerRepository extends JpaRepository<Consumer, Long> {
    Optional<Consumer> findByConsumerNo(String consumerNo);
    Optional<Consumer> findByMeterNumber(String meter_number);
}
