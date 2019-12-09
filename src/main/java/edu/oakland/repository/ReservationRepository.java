package edu.oakland.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.oakland.domain.Reservation;

/**
 * Spring Data  repository for the Reservation entity.
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>, JpaSpecificationExecutor<Reservation> {

    @Query("select reservation from Reservation reservation where reservation.user.login = ?#{principal.username}")
    List<Reservation> findByUserIsCurrentUser();

    @Query(value = "select distinct reservation from Reservation reservation left join fetch reservation.facilities left join fetch reservation.equipmentReservations",
        countQuery = "select count(distinct reservation) from Reservation reservation")
    Page<Reservation> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct reservation from Reservation reservation left join fetch reservation.facilities left join fetch reservation.equipmentReservations")
    List<Reservation> findAllWithEagerRelationships();

    @Query("select reservation from Reservation reservation left join fetch reservation.facilities left join fetch reservation.equipmentReservations where reservation.id =:id")
    Optional<Reservation> findOneWithEagerRelationships(@Param("id") Long id);

}
