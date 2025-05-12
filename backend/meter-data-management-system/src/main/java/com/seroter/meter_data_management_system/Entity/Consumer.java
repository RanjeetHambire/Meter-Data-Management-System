package com.seroter.meter_data_management_system.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@Table(name = "consumer")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consumer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String regionName;
    private String zoneName;
    private String circleName;
    private String divisionName;
    private String subdivisionName;
    private String consumerNo;
    private String consumerName;
    private String sectionName;
    private String dtcCode;
    private String meterNumber;
    private boolean solarRooftop;
    private double reading;

}