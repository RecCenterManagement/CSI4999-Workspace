package edu.oakland.service;

import edu.oakland.domain.Reservation;
import edu.oakland.domain.User;
import edu.oakland.repository.ReservationRepository;
import edu.oakland.security.AuthoritiesConstants;
import edu.oakland.security.SecurityUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Reservation}.
 */
@Service
@Transactional
public class ReservationService {

    private final Logger log = LoggerFactory.getLogger(ReservationService.class);

    private final ReservationRepository reservationRepository;

    private final UserService userService;

    public ReservationService(ReservationRepository reservationRepository, UserService userService) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
    }

    /**
     * Save a reservation.
     *
     * @param reservation the entity to save.
     * @return the persisted entity.
     */
    public Reservation save(Reservation reservation) {
        log.debug("Request to save Reservation : {}", reservation);
        reservation.getEquipmentReservations()
                .forEach(equipmentReservation -> equipmentReservation.setReservation(reservation));
        return reservationRepository.save(reservation);
    }

    /**
     * Get all the reservations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Reservation> findAll(Pageable pageable) {
        log.debug("Request to get all Reservations");
        return reservationRepository.findAll(pageable);
    }

    /**
     * Get all the reservations with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Reservation> findAllWithEagerRelationships(Pageable pageable) {
        return reservationRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one reservation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Reservation> findOne(Long id) {
        log.debug("Request to get Reservation : {}", id);
        return reservationRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the reservation by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Reservation : {}", id);
        reservationRepository.deleteById(id);
    }

    /**
     * Check if the currently authenticated user is the owner of the given
     * reservation
     * 
     * @param reservation the reservation to check ownership of
     */
    @Transactional(readOnly = true)
    public boolean currentUserIsOwner(Reservation reservation) {
        log.debug("Check if current user is the owner of reservation {}", reservation);
        Optional<User> currentUserOption = userService.getUserWithAuthorities();
        if (!currentUserOption.isPresent()) {
            return false;
        }
        final Long id = reservation.getId();
        if (id == null) {
            return true;
        }
        Optional<Reservation> dbReservationOption = reservationRepository.findById(id);
        if (!dbReservationOption.isPresent()) {
            return true;
        }
        User currentUser = currentUserOption.get();
        User dbUser = dbReservationOption.get().getUser();
        return currentUser.equals(dbUser);
    }

    /**
     * Check if the currently authenticated user has authority to edit or delete the
     * given Reservation
     * 
     * @param reservation the given reservation
     */
    public boolean currentUserCanEdit(Reservation reservation) {
        log.debug("Check if current user can edit reservation {}", reservation);
        return SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN) || currentUserIsOwner(reservation);
    }

    /**
     * Check if the currently authenticated user has authority to edit or delete the
     * reservation with the given id
     * 
     * @param id the ID of the reservation to check
     */
    public boolean currentUserCanEdit(Long id) {
        log.debug("Check if current user can edit reservation with ID {}", id);
        Optional<Reservation> reservationOption = reservationRepository.findById(id);
        if (!reservationOption.isPresent()) {
            return true;
        }
        return currentUserCanEdit(reservationOption.get());
    }
}
