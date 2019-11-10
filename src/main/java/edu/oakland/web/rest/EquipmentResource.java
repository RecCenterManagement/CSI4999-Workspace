package edu.oakland.web.rest;

import edu.oakland.domain.Equipment;
import edu.oakland.repository.EquipmentRepository;
import edu.oakland.service.EquipmentInventoryService;
import edu.oakland.service.dto.AvailableInventoryDTO;
import edu.oakland.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link edu.oakland.domain.Equipment}.
 */
@RestController
@RequestMapping("/api")
public class EquipmentResource {

    private final Logger log = LoggerFactory.getLogger(EquipmentResource.class);

    private static final String ENTITY_NAME = "equipment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EquipmentRepository equipmentRepository;

    private final EquipmentInventoryService inventoryService;

    public EquipmentResource(EquipmentRepository equipmentRepository, EquipmentInventoryService inventoryService) {
        this.equipmentRepository = equipmentRepository;
        this.inventoryService = inventoryService;
    }

    /**
     * {@code POST  /equipment} : Create a new equipment.
     *
     * @param equipment the equipment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new equipment, or with status {@code 400 (Bad Request)} if the equipment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/equipment")
    public ResponseEntity<Equipment> createEquipment(@Valid @RequestBody Equipment equipment) throws URISyntaxException {
        log.debug("REST request to save Equipment : {}", equipment);
        if (equipment.getId() != null) {
            throw new BadRequestAlertException("A new equipment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Equipment result = equipmentRepository.save(equipment);
        return ResponseEntity.created(new URI("/api/equipment/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /equipment} : Updates an existing equipment.
     *
     * @param equipment the equipment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated equipment,
     * or with status {@code 400 (Bad Request)} if the equipment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the equipment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/equipment")
    public ResponseEntity<Equipment> updateEquipment(@Valid @RequestBody Equipment equipment) throws URISyntaxException {
        log.debug("REST request to update Equipment : {}", equipment);
        if (equipment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Equipment result = equipmentRepository.save(equipment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, equipment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /equipment} : get all the equipment.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of equipment in body.
     */
    @GetMapping("/equipment")
    public List<Equipment> getAllEquipment() {
        log.debug("REST request to get all Equipment");
        return equipmentRepository.findAll();
    }

    /**
     * {@code GET  /equipment/:id} : get the "id" equipment.
     *
     * @param id the id of the equipment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the equipment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/equipment/{id}")
    public ResponseEntity<Equipment> getEquipment(@PathVariable Long id) {
        log.debug("REST request to get Equipment : {}", id);
        Optional<Equipment> equipment = equipmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(equipment);
    }

    @GetMapping("/equipment/inventory")
    public ResponseEntity<AvailableInventoryDTO> getEquipmentInventory(
            @RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) ZonedDateTime startTime,
            @RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) ZonedDateTime endTime) {
        if (!endTime.isAfter(startTime)) {
            throw new BadRequestAlertException("End time cannot preceed start time", "AvailableInventoryDTO",
                    "badtimecriteria");
        }
        AvailableInventoryDTO availableInventory = inventoryService.getAvailableInventory(startTime, endTime);
        return ResponseEntity.ok(availableInventory);
    }

    /**
     * {@code DELETE  /equipment/:id} : delete the "id" equipment.
     *
     * @param id the id of the equipment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/equipment/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        log.debug("REST request to delete Equipment : {}", id);
        equipmentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
