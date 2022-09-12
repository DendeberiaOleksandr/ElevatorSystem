package com.elevator.api.endpoints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElevatorUpdateRequestBody {

    private Integer currentFloor;
    private Integer targetFloor;

}
