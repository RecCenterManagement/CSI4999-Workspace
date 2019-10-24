package edu.oakland.web.rest;

import edu.oakland.domain.EquipmentBundle;
import edu.oakland.service.EquipmentBundleService;
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
 * REST controller for managing {@link edu.oakland.domain.EquipmentBundle}.
 */
@RestController
@RequestMapping("/api")
public class EquipmentBundleResource {

    private final Logger log = LoggerFactory.getLogger(EquipmentBundleResource.class);

    private static final String ENTITY_NAME = "equipmentBundle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EquipmentBundleService equipmentBundleService;

    public EquipmentBundleResource(EquipmentBundleService equipmentBundleService) {
        this.equipmentBundleService = equipmentBundleService;
    }

    /**
     * {@code POST  /equipment-bundles} : Create a new equipmentBundle.
     *
     * @param equipmentBundle the equipmentBundle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new equipmentBundle, or with status {@code 400 (Bad Request)} if the equipmentBundle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/equipment-bundles")
    public ResponseEntity<EquipmentBundle> createEquipmentBundle(@Valid @RequestBody EquipmentBundle equipmentBundle) throws URISyntaxException {
        log.debug("REST request to save EquipmentBundle : {}", equipmentBundle);
        if (equipmentBundle.getId() != null) {
            throw new BadRequestAlertException("A new equipmentBundle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EquipmentBundle result = equipmentBundleService.save(equipmentBundle);
        return ResponseEntity.created(new URI("/api/equipment-bundles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /equipment-bundles} : Updates an existing equipmentBundle.
     *
     * @param equipmentBundle the equipmentBundle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated equipmentBundle,
     * or with status {@code 400 (Bad Request)} if the equipmentBundle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the equipmentBundle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/equipment-bundles")
    public ResponseEntity<EquipmentBundle> updateEquipmentBundle(@Valid @RequestBody EquipmentBundle equipmentBundle) throws URISyntaxException {
        log.debug("REST request to update EquipmentBundle : {}", equipmentBundle);
        if (equipmentBundle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EquipmentBundle result = equipmentBundleService.save(equipmentBundle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, equipmentBundle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /equipment-bundles} : get all the equipmentBundles.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of equipmentBundles in body.
     */
    @GetMapping("/equipment-bundles")
    public List<EquipmentBundle> getAllEquipmentBundles() {
        log.debug("REST request to get all EquipmentBundles");
        return equipmentBundleService.findAll();
    }

    /**
     * {@code GET  /equipment-bundles/:id} : get the "id" equipmentBundle.
     *
     * @param id the id of the equipmentBundle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the equipmentBundle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/equipment-bundles/{id}")
    public ResponseEntity<EquipmentBundle> getEquipmentBundle(@PathVariable Long id) {
        log.debug("REST request to get EquipmentBundle : {}", id);
        Optional<EquipmentBundle> equipmentBundle = equipmentBundleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(equipmentBundle);
    }

    /**
     * {@code DELETE  /equipment-bundles/:id} : delete the "id" equipmentBundle.
     *
     * @param id the id of the equipmentBundle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/equipment-bundles/{id}")
    public ResponseEntity<Void> deleteEquipmentBundle(@PathVariable Long id) {
        log.debug("REST request to delete EquipmentBundle : {}", id);
        equipmentBundleService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
