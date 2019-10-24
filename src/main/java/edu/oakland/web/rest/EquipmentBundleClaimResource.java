package edu.oakland.web.rest;

import edu.oakland.domain.EquipmentBundleClaim;
import edu.oakland.repository.EquipmentBundleClaimRepository;
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
 * REST controller for managing {@link edu.oakland.domain.EquipmentBundleClaim}.
 */
@RestController
@RequestMapping("/api")
public class EquipmentBundleClaimResource {

    private final Logger log = LoggerFactory.getLogger(EquipmentBundleClaimResource.class);

    private static final String ENTITY_NAME = "equipmentBundleClaim";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EquipmentBundleClaimRepository equipmentBundleClaimRepository;

    public EquipmentBundleClaimResource(EquipmentBundleClaimRepository equipmentBundleClaimRepository) {
        this.equipmentBundleClaimRepository = equipmentBundleClaimRepository;
    }

    /**
     * {@code POST  /equipment-bundle-claims} : Create a new equipmentBundleClaim.
     *
     * @param equipmentBundleClaim the equipmentBundleClaim to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new equipmentBundleClaim, or with status {@code 400 (Bad Request)} if the equipmentBundleClaim has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/equipment-bundle-claims")
    public ResponseEntity<EquipmentBundleClaim> createEquipmentBundleClaim(@Valid @RequestBody EquipmentBundleClaim equipmentBundleClaim) throws URISyntaxException {
        log.debug("REST request to save EquipmentBundleClaim : {}", equipmentBundleClaim);
        if (equipmentBundleClaim.getId() != null) {
            throw new BadRequestAlertException("A new equipmentBundleClaim cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EquipmentBundleClaim result = equipmentBundleClaimRepository.save(equipmentBundleClaim);
        return ResponseEntity.created(new URI("/api/equipment-bundle-claims/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /equipment-bundle-claims} : Updates an existing equipmentBundleClaim.
     *
     * @param equipmentBundleClaim the equipmentBundleClaim to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated equipmentBundleClaim,
     * or with status {@code 400 (Bad Request)} if the equipmentBundleClaim is not valid,
     * or with status {@code 500 (Internal Server Error)} if the equipmentBundleClaim couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/equipment-bundle-claims")
    public ResponseEntity<EquipmentBundleClaim> updateEquipmentBundleClaim(@Valid @RequestBody EquipmentBundleClaim equipmentBundleClaim) throws URISyntaxException {
        log.debug("REST request to update EquipmentBundleClaim : {}", equipmentBundleClaim);
        if (equipmentBundleClaim.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EquipmentBundleClaim result = equipmentBundleClaimRepository.save(equipmentBundleClaim);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, equipmentBundleClaim.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /equipment-bundle-claims} : get all the equipmentBundleClaims.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of equipmentBundleClaims in body.
     */
    @GetMapping("/equipment-bundle-claims")
    public List<EquipmentBundleClaim> getAllEquipmentBundleClaims() {
        log.debug("REST request to get all EquipmentBundleClaims");
        return equipmentBundleClaimRepository.findAll();
    }

    /**
     * {@code GET  /equipment-bundle-claims/:id} : get the "id" equipmentBundleClaim.
     *
     * @param id the id of the equipmentBundleClaim to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the equipmentBundleClaim, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/equipment-bundle-claims/{id}")
    public ResponseEntity<EquipmentBundleClaim> getEquipmentBundleClaim(@PathVariable Long id) {
        log.debug("REST request to get EquipmentBundleClaim : {}", id);
        Optional<EquipmentBundleClaim> equipmentBundleClaim = equipmentBundleClaimRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(equipmentBundleClaim);
    }

    /**
     * {@code DELETE  /equipment-bundle-claims/:id} : delete the "id" equipmentBundleClaim.
     *
     * @param id the id of the equipmentBundleClaim to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/equipment-bundle-claims/{id}")
    public ResponseEntity<Void> deleteEquipmentBundleClaim(@PathVariable Long id) {
        log.debug("REST request to delete EquipmentBundleClaim : {}", id);
        equipmentBundleClaimRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
