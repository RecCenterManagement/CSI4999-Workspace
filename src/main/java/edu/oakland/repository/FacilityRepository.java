package edu.oakland.repository;
import edu.oakland.domain.Facility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Facility entity.
 */
@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {

    @Query(value = "select distinct facility from Facility facility left join fetch facility.equipmentBundles",
        countQuery = "select count(distinct facility) from Facility facility")
    Page<Facility> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct facility from Facility facility left join fetch facility.equipmentBundles")
    List<Facility> findAllWithEagerRelationships();

    @Query("select facility from Facility facility left join fetch facility.equipmentBundles where facility.id =:id")
    Optional<Facility> findOneWithEagerRelationships(@Param("id") Long id);

}
