package com.elevator.api.endpoints;

import com.elevator.api.dao.ElevatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/elevatorSystem")
public class ElevatorController {

    private final ElevatorService elevatorService;

    @GetMapping("/status")
    public List<ElevatorResponseBody> status(){
        return elevatorService.findAll().stream()
                .map(elevator -> new ElevatorResponseBody(elevator.getId(), elevator.getCurrentFloor(), elevator.getTargetFloor()))
                .collect(Collectors.toList());
    }

    @PostMapping("/step")
    public void step(){
        elevatorService.step();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody ElevatorUpdateRequestBody requestBody){
        try {
            return ResponseEntity.ok(elevatorService.update(id, requestBody.getCurrentFloor(), requestBody.getTargetFloor()));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/pickup/{id}")
    public void pickup(@PathVariable Integer id, @RequestBody ElevatorPickupRequestBody requestBody){
        elevatorService.pickup(id, requestBody.getTargetFloor());
    }

}
