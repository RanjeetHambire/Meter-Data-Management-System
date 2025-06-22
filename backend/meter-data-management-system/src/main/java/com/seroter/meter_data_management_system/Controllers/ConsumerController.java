package com.seroter.meter_data_management_system.Controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seroter.meter_data_management_system.Entity.Consumer;
import com.seroter.meter_data_management_system.Services.ConsumerService;

@RestController
@RequestMapping("/api/consumers")
public class ConsumerController {

    @Autowired
    private ConsumerService consumerService;
    
    @GetMapping("/find")
    public ResponseEntity<?> findConsumer(
        @RequestParam(required = false) String consumerNo,
        @RequestParam(required = false) String meterNumber) {

    Optional<Consumer> consumerOpt = consumerService.findByConsumerNoOrMeterNumber(consumerNo, meterNumber);

    if (consumerOpt.isPresent()) {
        return ResponseEntity.ok(consumerOpt.get());
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consumer not found");
    }
}

}
