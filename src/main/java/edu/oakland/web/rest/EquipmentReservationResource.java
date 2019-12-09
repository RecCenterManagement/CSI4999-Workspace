package edu.oakland.web.rest;

import edu.oakland.domain.EquipmentReservation;
import edu.oakland.service.EquipmentReservationService;
import edu.oakland.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link edu.oakland.domain.EquipmentReservation}.
 */
@RestController
@RequestMapping("/api")
public class EquipmentReservationResource {

    private final Logger log = LoggerFactory.getLogger(EquipmentReservationResource.class);

    private static final String ENTITY_NAME = "equipmentReservation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EquipmentReservationService equipmentReservationService;

    public EquipmentReservationResource(EquipmentReservationService equipmentReservationService) {
        this.equipmentReservationService = equipmentReservationService;
    }

    /**
     * {@code POST  /equipment-reservations} : Create a new equipmentReservation.
     *
     * @param equipmentReservation the equipmentReservation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new equipmentReservation, or with status {@code 400 (Bad Request)} if the equipmentReservation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/equipment-reservations")
    public ResponseEntity<EquipmentReservation> createEquipmentReservation(@Valid @RequestBody EquipmentReservation equipmentReservation) throws URISyntaxException {
        log.debug("REST request to save EquipmentReservation : {}", equipmentReservation);
        if (equipmentReservation.getId() != null) {
            throw new BadRequestAlertException("A new equipmentReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EquipmentReservation result = equipmentReservationService.save(equipmentReservation);
        return ResponseEntity.created(new URI("/api/equipment-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /equipment-reservations} : Updates an existing equipmentReservation.
     *
     * @param equipmentReservation the equipmentReservation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated equipmentReservation,
     * or with status {@code 400 (Bad Request)} if the equipmentReservation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the equipmentReservation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/equipment-reservations")
    public ResponseEntity<EquipmentReservation> updateEquipmentReservation(@Valid @RequestBody EquipmentReservation equipmentReservation) throws URISyntaxException {
        log.debug("REST request to update EquipmentReservation : {}", equipmentReservation);
        if (equipmentReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EquipmentReservation result = equipmentReservationService.save(equipmentReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, equipmentReservation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /equipment-reservations} : get all the equipmentReservations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of equipmentReservations in body.
     */
    @GetMapping("/equipment-reservations")
    public List<EquipmentReservation> getAllEquipmentReservations() {
        log.debug("REST request to get all EquipmentReservations");
        return equipmentReservationService.findAll();
    }

    /**
     * {@code GET  /equipment-reservations/:id} : get the "id" equipmentReservation.
     *
     * @param id the id of the equipmentReservation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the equipmentReservation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/equipment-reservations/{id}")
    public ResponseEntity<EquipmentReservation> getEquipmentReservation(@PathVariable Long id) {
        log.debug("REST request to get EquipmentReservation : {}", id);
        Optional<EquipmentReservation> equipmentReservation = equipmentReservationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(equipmentReservation);
    }

    /**
     * {@code DELETE  /equipment-reservations/:id} : delete the "id" equipmentReservation.
     *
     * @param id the id of the equipmentReservation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/equipment-reservations/{id}")
    public ResponseEntity<Void> deleteEquipmentReservation(@PathVariable Long id) {
        log.debug("REST request to delete EquipmentReservation : {}", id);
        equipmentReservationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
