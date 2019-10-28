package edu.oakland.service;

import edu.oakland.domain.Facility;
import edu.oakland.repository.FacilityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Facility}.
 */
@Service
@Transactional
public class FacilityService {

    private final Logger log = LoggerFactory.getLogger(FacilityService.class);

    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    /**
     * Save a facility.
     *
     * @param facility the entity to save.
     * @return the persisted entity.
     */
    public Facility save(Facility facility) {
        log.debug("Request to save Facility : {}", facility);
        return facilityRepository.save(facility);
    }

    /**
     * Get all the facilities.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Facility> findAll() {
        log.debug("Request to get all Facilities");
        return facilityRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the facilities with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Facility> findAllWithEagerRelationships(Pageable pageable) {
        return facilityRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one facility by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Facility> findOne(Long id) {
        log.debug("Request to get Facility : {}", id);
        return facilityRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the facility by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Facility : {}", id);
        facilityRepository.deleteById(id);
    }
}
