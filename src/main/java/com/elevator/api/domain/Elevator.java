package com.elevator.api.domain;

import com.elevator.api.dao.ElevatorEvent;
import com.elevator.api.dao.ElevatorEventQueue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Elevator {

    private Integer id;

    private Integer currentFloor;

    private Integer targetFloor;

    private ElevatorEventQueue<ElevatorEvent> elevatorEventQueue;
}
