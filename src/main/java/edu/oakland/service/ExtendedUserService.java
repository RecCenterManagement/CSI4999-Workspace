package edu.oakland.service;

import edu.oakland.service.dto.ExtendedUserDTO;
import edu.oakland.service.mapper.ExtendedUserMapper;
import edu.oakland.repository.ExtendedUserRepository;
import edu.oakland.service.UserService;
import edu.oakland.domain.User;
import edu.oakland.domain.ExtendedUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.LinkedList;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Interface for managing {@link edu.oakland.domain.ExtendedUser}.
 */
@Service
@Transactional 
public class ExtendedUserService {

    private final Logger log = LoggerFactory.getLogger(ExtendedUserService.class);

    private final ExtendedUserRepository extendedUserRepository;

    private final ExtendedUserMapper extendedUserMapper;

    private final UserService userService;

    private static class ExtendedUserServiceException extends RuntimeException {
        private ExtendedUserServiceException(String message) {
            super(message);
        }
    }

    public ExtendedUserService(
        ExtendedUserRepository extendedUserRepository,
        ExtendedUserMapper extendedUserMapper,
        UserService userService) {
        this.extendedUserRepository = extendedUserRepository;
        this.extendedUserMapper = extendedUserMapper;
        this.userService = userService;
    }

    /**
     * Save a extendedUser.
     *
     * @param extendedUserDTO the entity to save.
     * @return the persisted entity.
     */
    public ExtendedUserDTO save(ExtendedUserDTO extendedUserDTO) {
        log.debug("Request to save ExtendedUser : {}", extendedUserDTO);
        ExtendedUser extendedUser = extendedUserMapper.toEntity(extendedUserDTO);
        extendedUser = extendedUserRepository.save(extendedUser);
        return extendedUserMapper.toDto(extendedUser);
    }

    /**
     * Get all the extendedUsers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ExtendedUserDTO> findAll() {
        log.debug("Request to get all ExtendedUsers");
        return extendedUserRepository.findAll().stream()
            .map(extendedUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one extendedUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ExtendedUserDTO> findOne(Long id) {
        log.debug("Request to get ExtendedUser : {}", id);
        return extendedUserRepository.findById(id)
            .map(extendedUserMapper::toDto);
    }

    /**
     * Delete the extendedUser by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ExtendedUser : {}", id);
        extendedUserRepository.deleteById(id);
    }

    /**
     * Fetch the ExtendedUser of the currently logged-in user.
     */
    @Transactional(readOnly = true)
    public Optional<ExtendedUser> getCurrentExtendedUser() {
        User user = userService.getUserWithAuthorities()
                        .orElseThrow(() -> new ExtendedUserServiceException("User could not be found"));
        log.warn("{}", user.getId());
        return extendedUserRepository.findOneByUser(user);
    }
}
