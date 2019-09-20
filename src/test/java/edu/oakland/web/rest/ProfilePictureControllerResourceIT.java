package edu.oakland.web.rest;

import edu.oakland.RecCenterManagementApp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the ProfilePictureControllerResource REST controller.
 *
 * @see ProfilePictureControllerResource
 */
@SpringBootTest(classes = RecCenterManagementApp.class)
public class ProfilePictureControllerResourceIT {

    private MockMvc restMockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        ProfilePictureControllerResource profilePictureControllerResource = new ProfilePictureControllerResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(profilePictureControllerResource)
            .build();
    }

    /**
     * Test getUserProfilePicture
     */
    @Test
    public void testGetUserProfilePicture() throws Exception {
        restMockMvc.perform(get("/api/profile-picture-controller/get-user-profile-picture"))
            .andExpect(status().isOk());
    }
}
