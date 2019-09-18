package edu.oakland.repository;

import edu.oakland.domain.ProfilePicture;
import edu.oakland.domain.User;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the ProfilePicture entity.
 */
@Repository
public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {

    Long deleteByUser(User user);

    @Query("select p.user from ProfilePicture p where p.id = ?1")
    User findUserById(Long id);

}
