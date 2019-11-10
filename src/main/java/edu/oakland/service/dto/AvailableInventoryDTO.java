package edu.oakland.service.dto;

import java.time.ZonedDateTime;
import java.util.Map;

import edu.oakland.domain.Equipment;

/**
 * DTO for conveying information about how much equipment is available for use
 * in a span of time
 */
public class AvailableInventoryDTO {

    private ZonedDateTime startTime;

    private ZonedDateTime endTime;

    private Map<Equipment, Integer> availableInventory;

    public AvailableInventoryDTO() {

    }

    public AvailableInventoryDTO(ZonedDateTime startTime, ZonedDateTime endTime,
            Map<Equipment, Integer> availableInventory) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.availableInventory = availableInventory;
    }

    public ZonedDateTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return this.endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public Map<Equipment, Integer> getAvailableInventory() {
        return this.availableInventory;
    }

    public void setAvailableInventory(Map<Equipment, Integer> availableInventory) {
        this.availableInventory = availableInventory;
    }
}