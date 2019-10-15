package edu.oakland.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import edu.oakland.domain.Reservation;
import edu.oakland.domain.*; // for static metamodels
import edu.oakland.repository.ReservationRepository;
import edu.oakland.service.dto.ReservationCriteria;

/**
 * Service for executing complex queries for {@link Reservation} entities in the database.
 * The main input is a {@link ReservationCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Reservation} or a {@link Page} of {@link Reservation} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ReservationQueryService extends QueryService<Reservation> {

    private final Logger log = LoggerFactory.getLogger(ReservationQueryService.class);

    private final ReservationRepository reservationRepository;

    public ReservationQueryService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    /**
     * Return a {@link List} of {@link Reservation} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Reservation> findByCriteria(ReservationCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Reservation> specification = createSpecification(criteria);
        return reservationRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Reservation} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Reservation> findByCriteria(ReservationCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Reservation> specification = createSpecification(criteria);
        return reservationRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ReservationCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Reservation> specification = createSpecification(criteria);
        return reservationRepository.count(specification);
    }

    /**
     * Function to convert ConsumerCriteria to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */    
    protected Specification<Reservation> createSpecification(ReservationCriteria criteria) {
        Specification<Reservation> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Reservation_.id));
            }
            if (criteria.getEvent() != null) {
                specification = specification.and(buildStringSpecification(criteria.getEvent(), Reservation_.event));
            }
            if (criteria.getEstimatedParticipants() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getEstimatedParticipants(), Reservation_.estimatedParticipants));
            }
            if (criteria.getStartTime() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getStartTime(), Reservation_.startTime));
            }
            if (criteria.getEndTime() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getEndTime(), Reservation_.endTime));
            }
            if (criteria.getUserId() != null) {
                specification = specification.and(buildSpecification(criteria.getUserId(),
                    root -> root.join(Reservation_.user, JoinType.LEFT).get(User_.id)));
            }
            if (criteria.getFacilitiesId() != null) {
                specification = specification.and(buildSpecification(criteria.getFacilitiesId(),
                    root -> root.join(Reservation_.facilities, JoinType.LEFT).get(Facility_.id)));
            }
            if (criteria.getEquipmentReservationsId() != null) {
                specification = specification.and(buildSpecification(criteria.getEquipmentReservationsId(),
                    root -> root.join(Reservation_.equipmentReservations, JoinType.LEFT).get(EquipmentReservation_.id)));
            }
        }
        return specification;
    }
}
