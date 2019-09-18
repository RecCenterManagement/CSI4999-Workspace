package edu.oakland.web.rest;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.oakland.domain.ProfilePicture;
import edu.oakland.service.ProfilePictureService;

/**
 * Controller responsible for returning the image data in a particular
 * ProfilePicture
 */
@Controller
@RequestMapping("/content")
public class ProfilePictureController {

    private final Logger log = LoggerFactory.getLogger(ProfilePictureController.class);

    private final ProfilePictureService profilePictureService;

    public ProfilePictureController(ProfilePictureService profilePictureService) {
        this.profilePictureService = profilePictureService;
    }

    /**
     * {@code GET  /user-profile-picture/:id} : get the image data from the
     * ProfilePicture with the given id.
     * 
     * @param id the id of the ProfilePicture whose image data is to be retrieved
     * @return the {@link ResponseEntity} with {@code 200(OK)} and with body
     *         containing the image data, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-profile-picture/{id}")
    public ResponseEntity<byte[]> getUserProfilePicture(@PathVariable Long id) {
        log.debug("Request for ProfilePicture image data at ID {}.", id);
        Optional<ProfilePicture> profilePictureOption = profilePictureService.findOne(id);

        if (!profilePictureOption.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ProfilePicture profilePicture = profilePictureOption.get();
        byte[] imageData = profilePicture.getImageData();
        String imageContentType = profilePicture.getImageDataContentType();

        //@formatter:off

        return ResponseEntity.ok()
            .contentLength(imageData.length)
            .contentType(MediaType.parseMediaType(imageContentType))
            .body(imageData);

        //@formatter:on
    }

}
