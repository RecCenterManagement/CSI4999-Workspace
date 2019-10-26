package edu.oakland.repository;
import edu.oakland.domain.EquipmentBundleClaim;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EquipmentBundleClaim entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipmentBundleClaimRepository extends JpaRepository<EquipmentBundleClaim, Long> {

}
