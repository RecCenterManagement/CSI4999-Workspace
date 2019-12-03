package edu.oakland.repository;

import edu.oakland.domain.ProfilePicture;
import edu.oakland.domain.User;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data repository for the ProfilePicture entity.
 */
@Repository
public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {


    @Transactional
    @Modifying
    @Query("delete from ProfilePicture p where p.user = user")
    void deleteByUser(User user);

    @Query("select p.user from ProfilePicture p where p.id = ?1")
    User findUserById(Long id);

}
