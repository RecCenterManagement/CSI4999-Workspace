package edu.oakland.repository;
import edu.oakland.domain.EquipmentBundle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EquipmentBundle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipmentBundleRepository extends JpaRepository<EquipmentBundle, Long> {

}
