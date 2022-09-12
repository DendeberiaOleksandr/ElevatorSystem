package com.elevator.api.dao;

import com.elevator.api.domain.Elevator;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class InMemoryElevatorRepository implements ElevatorRepository {

    private final List<Elevator> elevators = new ArrayList<>();

    public InMemoryElevatorRepository() {
        for (int i = 0; i < 16; i++) {
            elevators.add(new Elevator(
                    i,
                    0,
                    0,
                    new ElevatorEventQueue<>(new LinkedList<>())
            ));
        }
    }

    @Override
    public List<Elevator> findAll() {
        return elevators;
    }

    @Override
    public Elevator update(Integer id, Integer currentFloor, Integer targetFloor) {
        Elevator existedElevator = elevators.stream()
                .filter((elevator) -> elevator.getId().equals(id))
                .findFirst().orElseThrow();
        existedElevator.setCurrentFloor(currentFloor);
        existedElevator.setTargetFloor(targetFloor);
        return existedElevator;
    }

    @Override
    public void pickup(Integer id, Integer targetFloor) {
        Elevator elevator = elevators.get(id);
        elevator.setTargetFloor(targetFloor);

        for (int i = 0; i < Math.abs(targetFloor - elevator.getCurrentFloor()); i++) {
            if (elevator.getCurrentFloor() < targetFloor) {
                elevator.getElevatorEventQueue().offer(new ElevatorEvent(1));
            } else if (elevator.getCurrentFloor() > targetFloor) {
                elevator.getElevatorEventQueue().offer(new ElevatorEvent(-1));
            }
        }

    }

    @Override
    public void step() {
        elevators.forEach(elevator -> {
            ElevatorEventQueue<ElevatorEvent> elevatorEventQueue = elevator.getElevatorEventQueue();
            if (!elevatorEventQueue.isEmpty()) {
                ElevatorEvent elevatorEvent = elevatorEventQueue.poll();
                if (elevatorEvent != null) {
                    elevator.setCurrentFloor(elevator.getCurrentFloor() + elevatorEvent.getStep());
                }
            }
        });
    }
}
