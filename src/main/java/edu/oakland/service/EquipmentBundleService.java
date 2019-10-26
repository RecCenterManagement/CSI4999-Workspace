package edu.oakland.service;

import edu.oakland.domain.EquipmentBundle;
import edu.oakland.repository.EquipmentBundleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link EquipmentBundle}.
 */
@Service
@Transactional
public class EquipmentBundleService {

    private final Logger log = LoggerFactory.getLogger(EquipmentBundleService.class);

    private final EquipmentBundleRepository equipmentBundleRepository;

    public EquipmentBundleService(EquipmentBundleRepository equipmentBundleRepository) {
        this.equipmentBundleRepository = equipmentBundleRepository;
    }

    /**
     * Save a equipmentBundle.
     *
     * @param equipmentBundle the entity to save.
     * @return the persisted entity.
     */
    public EquipmentBundle save(EquipmentBundle equipmentBundle) {
        log.debug("Request to save EquipmentBundle : {}", equipmentBundle);
        equipmentBundle.getClaims().forEach(claim -> claim.setEquipmentBundle(equipmentBundle));
        return equipmentBundleRepository.save(equipmentBundle);
    }

    /**
     * Get all the equipmentBundles.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EquipmentBundle> findAll() {
        log.debug("Request to get all EquipmentBundles");
        return equipmentBundleRepository.findAll();
    }


    /**
     * Get one equipmentBundle by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EquipmentBundle> findOne(Long id) {
        log.debug("Request to get EquipmentBundle : {}", id);
        return equipmentBundleRepository.findById(id);
    }

    /**
     * Delete the equipmentBundle by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EquipmentBundle : {}", id);
        equipmentBundleRepository.deleteById(id);
    }
}
