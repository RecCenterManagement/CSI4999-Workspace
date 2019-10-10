package edu.oakland.service;

import edu.oakland.domain.EquipmentReservation;
import edu.oakland.repository.EquipmentReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link EquipmentReservation}.
 */
@Service
@Transactional
public class EquipmentReservationService {

    private final Logger log = LoggerFactory.getLogger(EquipmentReservationService.class);

    private final EquipmentReservationRepository equipmentReservationRepository;

    public EquipmentReservationService(EquipmentReservationRepository equipmentReservationRepository) {
        this.equipmentReservationRepository = equipmentReservationRepository;
    }

    /**
     * Save a equipmentReservation.
     *
     * @param equipmentReservation the entity to save.
     * @return the persisted entity.
     */
    public EquipmentReservation save(EquipmentReservation equipmentReservation) {
        log.debug("Request to save EquipmentReservation : {}", equipmentReservation);
        return equipmentReservationRepository.save(equipmentReservation);
    }

    /**
     * Get all the equipmentReservations.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EquipmentReservation> findAll() {
        log.debug("Request to get all EquipmentReservations");
        return equipmentReservationRepository.findAll();
    }


    /**
     * Get one equipmentReservation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EquipmentReservation> findOne(Long id) {
        log.debug("Request to get EquipmentReservation : {}", id);
        return equipmentReservationRepository.findById(id);
    }

    /**
     * Delete the equipmentReservation by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EquipmentReservation : {}", id);
        equipmentReservationRepository.deleteById(id);
    }
}
