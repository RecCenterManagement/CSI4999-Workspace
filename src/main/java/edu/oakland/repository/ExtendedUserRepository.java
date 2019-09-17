package edu.oakland.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import edu.oakland.domain.User;
import edu.oakland.domain.ExtendedUser;

import java.util.Optional;

/**
 * Spring Data  repository for the ExtendedUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedUserRepository extends JpaRepository<ExtendedUser, Long> {
    
    Optional<ExtendedUser> findOneByUser(User user);

}
