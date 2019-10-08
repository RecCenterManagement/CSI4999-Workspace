package edu.oakland.repository;
import edu.oakland.domain.EquipmentReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EquipmentReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipmentReservationRepository extends JpaRepository<EquipmentReservation, Long> {

}
