package com.elevator.api.dao;

import com.elevator.api.domain.Elevator;

import java.util.List;

public interface ElevatorRepository {

    List<Elevator> findAll();

    Elevator update(Integer id, Integer currentFloor, Integer targetFloor);

    void pickup(Integer id, Integer targetFloor);

    void step();
}
