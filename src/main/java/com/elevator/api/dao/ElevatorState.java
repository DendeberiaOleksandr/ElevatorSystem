package com.elevator.api.dao;

import com.elevator.api.domain.Elevator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ElevatorState {

    private Elevator elevator;
    private ElevatorEventQueue<ElevatorEvent> elevatorEventQueue;

}
