package edu.oakland.service;

import edu.oakland.domain.ProfilePicture;
import edu.oakland.domain.User;
import edu.oakland.repository.ProfilePictureRepository;
import edu.oakland.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ProfilePicture}.
 */
@Service
@Transactional
public class ProfilePictureService {

    private final Logger log = LoggerFactory.getLogger(ProfilePictureService.class);

    private final ProfilePictureRepository profilePictureRepository;

    private final UserRepository userRepository;

    public ProfilePictureService(ProfilePictureRepository profilePictureRepository, UserRepository userRepository) {
        this.profilePictureRepository = profilePictureRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a profilePicture. Note that if the profilePicture is new then this
     * method will delete any pre-existing {@link ProfilePicture} that currently is
     * related to the associated {@link User}. Otherwise the record will simply be
     * updated in-place. This method will update the associated {@link User} such
     * that its imageUrl points at the profilePicture endpoint.
     *
     * @param profilePicture the entity to save.
     * @return the persisted entity.
     */
    public ProfilePicture save(ProfilePicture profilePicture) {
        log.debug("Request to save ProfilePicture : {}", profilePicture);

        Optional<User> userOption = userRepository.findById(profilePicture.getUser().getId());
        if (!userOption.isPresent()) {
            // TODO: This could be a customized error
            throw new IllegalArgumentException();
        }
        User user = userOption.get();
        if (profilePicture.getId() == null) {
            profilePictureRepository.deleteByUser(user);
        }
        profilePicture = profilePictureRepository.save(profilePicture);
        user.setImageUrl("/content/user-profile-picture/" + profilePicture.getId());
        user = userRepository.save(user);

        return profilePicture;
    }

    /**
     * Get all the profilePictures.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProfilePicture> findAll() {
        log.debug("Request to get all ProfilePictures");
        return profilePictureRepository.findAll();
    }

    /**
     * Get one profilePicture by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProfilePicture> findOne(Long id) {
        log.debug("Request to get ProfilePicture : {}", id);
        return profilePictureRepository.findById(id);
    }

    /**
     * Delete the profilePicture by id. Sets the imageUrl in the associated
     * {@link User} to the empty string.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProfilePicture : {}", id);
        User user = profilePictureRepository.findUserById(id);
        user.setImageUrl("");
        userRepository.save(user);
        profilePictureRepository.deleteById(id);
    }
}
