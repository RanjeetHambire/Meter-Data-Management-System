package com.seroter.meter_data_management_system.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seroter.meter_data_management_system.Entity.Consumer;
import com.seroter.meter_data_management_system.Repository.ConsumerRepository;

@Service
public class ConsumerService {
    @Autowired
    private ConsumerRepository consumerRepository;

    public Optional<Consumer> findByConsumerNoOrMeterNumber(String consumerNo, String meterNumber) {
        if (consumerNo != null && !consumerNo.isEmpty()) {
            return consumerRepository.findByConsumerNo(consumerNo);
        } else if (meterNumber != null && !meterNumber.isEmpty()) {
            return consumerRepository.findByMeterNumber(meterNumber);
        }
        return Optional.empty();
    }
}
