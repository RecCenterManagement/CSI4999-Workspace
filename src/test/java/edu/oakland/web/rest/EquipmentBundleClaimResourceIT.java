package edu.oakland.web.rest;

import edu.oakland.RecCenterManagementApp;
import edu.oakland.domain.EquipmentBundleClaim;
import edu.oakland.domain.EquipmentBundle;
import edu.oakland.domain.Equipment;
import edu.oakland.repository.EquipmentBundleClaimRepository;
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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static edu.oakland.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EquipmentBundleClaimResource} REST controller.
 */
@SpringBootTest(classes = RecCenterManagementApp.class)
public class EquipmentBundleClaimResourceIT {

    private static final Integer DEFAULT_COUNT = 0;
    private static final Integer UPDATED_COUNT = 1;
    private static final Integer SMALLER_COUNT = 0 - 1;

    @Autowired
    private EquipmentBundleClaimRepository equipmentBundleClaimRepository;

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

    private MockMvc restEquipmentBundleClaimMockMvc;

    private EquipmentBundleClaim equipmentBundleClaim;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EquipmentBundleClaimResource equipmentBundleClaimResource = new EquipmentBundleClaimResource(equipmentBundleClaimRepository);
        this.restEquipmentBundleClaimMockMvc = MockMvcBuilders.standaloneSetup(equipmentBundleClaimResource)
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
    public static EquipmentBundleClaim createEntity(EntityManager em) {
        EquipmentBundleClaim equipmentBundleClaim = new EquipmentBundleClaim()
            .count(DEFAULT_COUNT);
        // Add required entity
        EquipmentBundle equipmentBundle;
        if (TestUtil.findAll(em, EquipmentBundle.class).isEmpty()) {
            equipmentBundle = EquipmentBundleResourceIT.createEntity(em);
            em.persist(equipmentBundle);
            em.flush();
        } else {
            equipmentBundle = TestUtil.findAll(em, EquipmentBundle.class).get(0);
        }
        equipmentBundleClaim.setEquipmentBundle(equipmentBundle);
        // Add required entity
        Equipment equipment;
        if (TestUtil.findAll(em, Equipment.class).isEmpty()) {
            equipment = EquipmentResourceIT.createEntity(em);
            em.persist(equipment);
            em.flush();
        } else {
            equipment = TestUtil.findAll(em, Equipment.class).get(0);
        }
        equipmentBundleClaim.setEquipment(equipment);
        return equipmentBundleClaim;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EquipmentBundleClaim createUpdatedEntity(EntityManager em) {
        EquipmentBundleClaim equipmentBundleClaim = new EquipmentBundleClaim()
            .count(UPDATED_COUNT);
        // Add required entity
        EquipmentBundle equipmentBundle;
        if (TestUtil.findAll(em, EquipmentBundle.class).isEmpty()) {
            equipmentBundle = EquipmentBundleResourceIT.createUpdatedEntity(em);
            em.persist(equipmentBundle);
            em.flush();
        } else {
            equipmentBundle = TestUtil.findAll(em, EquipmentBundle.class).get(0);
        }
        equipmentBundleClaim.setEquipmentBundle(equipmentBundle);
        // Add required entity
        Equipment equipment;
        if (TestUtil.findAll(em, Equipment.class).isEmpty()) {
            equipment = EquipmentResourceIT.createUpdatedEntity(em);
            em.persist(equipment);
            em.flush();
        } else {
            equipment = TestUtil.findAll(em, Equipment.class).get(0);
        }
        equipmentBundleClaim.setEquipment(equipment);
        return equipmentBundleClaim;
    }

    @BeforeEach
    public void initTest() {
        equipmentBundleClaim = createEntity(em);
    }

    @Test
    @Transactional
    public void createEquipmentBundleClaim() throws Exception {
        int databaseSizeBeforeCreate = equipmentBundleClaimRepository.findAll().size();

        // Create the EquipmentBundleClaim
        restEquipmentBundleClaimMockMvc.perform(post("/api/equipment-bundle-claims")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundleClaim)))
            .andExpect(status().isCreated());

        // Validate the EquipmentBundleClaim in the database
        List<EquipmentBundleClaim> equipmentBundleClaimList = equipmentBundleClaimRepository.findAll();
        assertThat(equipmentBundleClaimList).hasSize(databaseSizeBeforeCreate + 1);
        EquipmentBundleClaim testEquipmentBundleClaim = equipmentBundleClaimList.get(equipmentBundleClaimList.size() - 1);
        assertThat(testEquipmentBundleClaim.getCount()).isEqualTo(DEFAULT_COUNT);
    }

    @Test
    @Transactional
    public void createEquipmentBundleClaimWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equipmentBundleClaimRepository.findAll().size();

        // Create the EquipmentBundleClaim with an existing ID
        equipmentBundleClaim.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEquipmentBundleClaimMockMvc.perform(post("/api/equipment-bundle-claims")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundleClaim)))
            .andExpect(status().isBadRequest());

        // Validate the EquipmentBundleClaim in the database
        List<EquipmentBundleClaim> equipmentBundleClaimList = equipmentBundleClaimRepository.findAll();
        assertThat(equipmentBundleClaimList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCountIsRequired() throws Exception {
        int databaseSizeBeforeTest = equipmentBundleClaimRepository.findAll().size();
        // set the field null
        equipmentBundleClaim.setCount(null);

        // Create the EquipmentBundleClaim, which fails.

        restEquipmentBundleClaimMockMvc.perform(post("/api/equipment-bundle-claims")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundleClaim)))
            .andExpect(status().isBadRequest());

        List<EquipmentBundleClaim> equipmentBundleClaimList = equipmentBundleClaimRepository.findAll();
        assertThat(equipmentBundleClaimList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEquipmentBundleClaims() throws Exception {
        // Initialize the database
        equipmentBundleClaimRepository.saveAndFlush(equipmentBundleClaim);

        // Get all the equipmentBundleClaimList
        restEquipmentBundleClaimMockMvc.perform(get("/api/equipment-bundle-claims?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equipmentBundleClaim.getId().intValue())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT)));
    }
    
    @Test
    @Transactional
    public void getEquipmentBundleClaim() throws Exception {
        // Initialize the database
        equipmentBundleClaimRepository.saveAndFlush(equipmentBundleClaim);

        // Get the equipmentBundleClaim
        restEquipmentBundleClaimMockMvc.perform(get("/api/equipment-bundle-claims/{id}", equipmentBundleClaim.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(equipmentBundleClaim.getId().intValue()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingEquipmentBundleClaim() throws Exception {
        // Get the equipmentBundleClaim
        restEquipmentBundleClaimMockMvc.perform(get("/api/equipment-bundle-claims/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEquipmentBundleClaim() throws Exception {
        // Initialize the database
        equipmentBundleClaimRepository.saveAndFlush(equipmentBundleClaim);

        int databaseSizeBeforeUpdate = equipmentBundleClaimRepository.findAll().size();

        // Update the equipmentBundleClaim
        EquipmentBundleClaim updatedEquipmentBundleClaim = equipmentBundleClaimRepository.findById(equipmentBundleClaim.getId()).get();
        // Disconnect from session so that the updates on updatedEquipmentBundleClaim are not directly saved in db
        em.detach(updatedEquipmentBundleClaim);
        updatedEquipmentBundleClaim
            .count(UPDATED_COUNT);

        restEquipmentBundleClaimMockMvc.perform(put("/api/equipment-bundle-claims")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEquipmentBundleClaim)))
            .andExpect(status().isOk());

        // Validate the EquipmentBundleClaim in the database
        List<EquipmentBundleClaim> equipmentBundleClaimList = equipmentBundleClaimRepository.findAll();
        assertThat(equipmentBundleClaimList).hasSize(databaseSizeBeforeUpdate);
        EquipmentBundleClaim testEquipmentBundleClaim = equipmentBundleClaimList.get(equipmentBundleClaimList.size() - 1);
        assertThat(testEquipmentBundleClaim.getCount()).isEqualTo(UPDATED_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingEquipmentBundleClaim() throws Exception {
        int databaseSizeBeforeUpdate = equipmentBundleClaimRepository.findAll().size();

        // Create the EquipmentBundleClaim

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEquipmentBundleClaimMockMvc.perform(put("/api/equipment-bundle-claims")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundleClaim)))
            .andExpect(status().isBadRequest());

        // Validate the EquipmentBundleClaim in the database
        List<EquipmentBundleClaim> equipmentBundleClaimList = equipmentBundleClaimRepository.findAll();
        assertThat(equipmentBundleClaimList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEquipmentBundleClaim() throws Exception {
        // Initialize the database
        equipmentBundleClaimRepository.saveAndFlush(equipmentBundleClaim);

        int databaseSizeBeforeDelete = equipmentBundleClaimRepository.findAll().size();

        // Delete the equipmentBundleClaim
        restEquipmentBundleClaimMockMvc.perform(delete("/api/equipment-bundle-claims/{id}", equipmentBundleClaim.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EquipmentBundleClaim> equipmentBundleClaimList = equipmentBundleClaimRepository.findAll();
        assertThat(equipmentBundleClaimList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EquipmentBundleClaim.class);
        EquipmentBundleClaim equipmentBundleClaim1 = new EquipmentBundleClaim();
        equipmentBundleClaim1.setId(1L);
        EquipmentBundleClaim equipmentBundleClaim2 = new EquipmentBundleClaim();
        equipmentBundleClaim2.setId(equipmentBundleClaim1.getId());
        assertThat(equipmentBundleClaim1).isEqualTo(equipmentBundleClaim2);
        equipmentBundleClaim2.setId(2L);
        assertThat(equipmentBundleClaim1).isNotEqualTo(equipmentBundleClaim2);
        equipmentBundleClaim1.setId(null);
        assertThat(equipmentBundleClaim1).isNotEqualTo(equipmentBundleClaim2);
    }
}
