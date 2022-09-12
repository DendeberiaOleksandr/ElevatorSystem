package com.elevator.api.dao;

import com.elevator.api.domain.Elevator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ElevatorService {

    private final ElevatorRepository elevatorRepository;

    public List<Elevator> findAll() {
        return elevatorRepository.findAll();
    }

    public Elevator update(Integer id, Integer currentFloor, Integer targetFloor) {
        return elevatorRepository.update(id, currentFloor, targetFloor);
    }

    public void pickup(Integer id, Integer targetFloor) {
        elevatorRepository.pickup(id, targetFloor);
    }

    public void step() {
        elevatorRepository.step();
    }
}
