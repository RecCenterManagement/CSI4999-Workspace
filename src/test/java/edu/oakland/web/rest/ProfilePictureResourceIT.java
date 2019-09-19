package edu.oakland.web.rest;

import edu.oakland.RecCenterManagementApp;
import edu.oakland.domain.ProfilePicture;
import edu.oakland.domain.User;
import edu.oakland.repository.ProfilePictureRepository;
import edu.oakland.service.ProfilePictureService;
import edu.oakland.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static edu.oakland.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProfilePictureResource} REST controller.
 */
@SpringBootTest(classes = RecCenterManagementApp.class)
public class ProfilePictureResourceIT {

    private static final byte[] DEFAULT_IMAGE_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_DATA_CONTENT_TYPE = "image/png";

    @Autowired
    private ProfilePictureRepository profilePictureRepository;

    @Autowired
    private ProfilePictureService profilePictureService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProfilePictureMockMvc;

    private ProfilePicture profilePicture;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfilePictureResource profilePictureResource = new ProfilePictureResource(profilePictureService);
        this.restProfilePictureMockMvc = MockMvcBuilders.standaloneSetup(profilePictureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePicture createEntity(EntityManager em) {
        ProfilePicture profilePicture = new ProfilePicture()
            .imageData(DEFAULT_IMAGE_DATA)
            .imageDataContentType(DEFAULT_IMAGE_DATA_CONTENT_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        profilePicture.setUser(user);
        return profilePicture;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilePicture createUpdatedEntity(EntityManager em) {
        ProfilePicture profilePicture = new ProfilePicture()
            .imageData(UPDATED_IMAGE_DATA)
            .imageDataContentType(UPDATED_IMAGE_DATA_CONTENT_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        profilePicture.setUser(user);
        return profilePicture;
    }

    @BeforeEach
    public void initTest() {
        profilePicture = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilePicture() throws Exception {
        int databaseSizeBeforeCreate = profilePictureRepository.findAll().size();

        // Create the ProfilePicture
        restProfilePictureMockMvc.perform(post("/api/profile-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilePicture)))
            .andExpect(status().isCreated());

        // Validate the ProfilePicture in the database
        List<ProfilePicture> profilePictureList = profilePictureRepository.findAll();
        assertThat(profilePictureList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilePicture testProfilePicture = profilePictureList.get(profilePictureList.size() - 1);
        assertThat(testProfilePicture.getImageData()).isEqualTo(DEFAULT_IMAGE_DATA);
        assertThat(testProfilePicture.getImageDataContentType()).isEqualTo(DEFAULT_IMAGE_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createProfilePictureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilePictureRepository.findAll().size();

        // Create the ProfilePicture with an existing ID
        profilePicture.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilePictureMockMvc.perform(post("/api/profile-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilePicture)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePicture in the database
        List<ProfilePicture> profilePictureList = profilePictureRepository.findAll();
        assertThat(profilePictureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfilePictures() throws Exception {
        // Initialize the database
        profilePictureRepository.saveAndFlush(profilePicture);

        // Get all the profilePictureList
        restProfilePictureMockMvc.perform(get("/api/profile-pictures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilePicture.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageDataContentType").value(hasItem(DEFAULT_IMAGE_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imageData").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE_DATA))));
    }
    
    @Test
    @Transactional
    public void getProfilePicture() throws Exception {
        // Initialize the database
        profilePictureRepository.saveAndFlush(profilePicture);

        // Get the profilePicture
        restProfilePictureMockMvc.perform(get("/api/profile-pictures/{id}", profilePicture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(profilePicture.getId().intValue()))
            .andExpect(jsonPath("$.imageDataContentType").value(DEFAULT_IMAGE_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.imageData").value(Base64Utils.encodeToString(DEFAULT_IMAGE_DATA)));
    }

    @Test
    @Transactional
    public void getNonExistingProfilePicture() throws Exception {
        // Get the profilePicture
        restProfilePictureMockMvc.perform(get("/api/profile-pictures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilePicture() throws Exception {
        // Initialize the database
        profilePictureService.save(profilePicture);

        int databaseSizeBeforeUpdate = profilePictureRepository.findAll().size();

        // Update the profilePicture
        ProfilePicture updatedProfilePicture = profilePictureRepository.findById(profilePicture.getId()).get();
        // Disconnect from session so that the updates on updatedProfilePicture are not directly saved in db
        em.detach(updatedProfilePicture);
        updatedProfilePicture
            .imageData(UPDATED_IMAGE_DATA)
            .imageDataContentType(UPDATED_IMAGE_DATA_CONTENT_TYPE);

        restProfilePictureMockMvc.perform(put("/api/profile-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilePicture)))
            .andExpect(status().isOk());

        // Validate the ProfilePicture in the database
        List<ProfilePicture> profilePictureList = profilePictureRepository.findAll();
        assertThat(profilePictureList).hasSize(databaseSizeBeforeUpdate);
        ProfilePicture testProfilePicture = profilePictureList.get(profilePictureList.size() - 1);
        assertThat(testProfilePicture.getImageData()).isEqualTo(UPDATED_IMAGE_DATA);
        assertThat(testProfilePicture.getImageDataContentType()).isEqualTo(UPDATED_IMAGE_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilePicture() throws Exception {
        int databaseSizeBeforeUpdate = profilePictureRepository.findAll().size();

        // Create the ProfilePicture

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilePictureMockMvc.perform(put("/api/profile-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilePicture)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilePicture in the database
        List<ProfilePicture> profilePictureList = profilePictureRepository.findAll();
        assertThat(profilePictureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilePicture() throws Exception {
        // Initialize the database
        profilePictureService.save(profilePicture);

        int databaseSizeBeforeDelete = profilePictureRepository.findAll().size();

        // Delete the profilePicture
        restProfilePictureMockMvc.perform(delete("/api/profile-pictures/{id}", profilePicture.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfilePicture> profilePictureList = profilePictureRepository.findAll();
        assertThat(profilePictureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilePicture.class);
        ProfilePicture profilePicture1 = new ProfilePicture();
        profilePicture1.setId(1L);
        ProfilePicture profilePicture2 = new ProfilePicture();
        profilePicture2.setId(profilePicture1.getId());
        assertThat(profilePicture1).isEqualTo(profilePicture2);
        profilePicture2.setId(2L);
        assertThat(profilePicture1).isNotEqualTo(profilePicture2);
        profilePicture1.setId(null);
        assertThat(profilePicture1).isNotEqualTo(profilePicture2);
    }
}
