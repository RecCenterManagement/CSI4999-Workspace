package edu.oakland.web.rest;

import edu.oakland.RecCenterManagementApp;
import edu.oakland.domain.EquipmentBundle;
import edu.oakland.repository.EquipmentBundleRepository;
import edu.oakland.service.EquipmentBundleService;
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
 * Integration tests for the {@link EquipmentBundleResource} REST controller.
 */
@SpringBootTest(classes = RecCenterManagementApp.class)
public class EquipmentBundleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EquipmentBundleRepository equipmentBundleRepository;

    @Autowired
    private EquipmentBundleService equipmentBundleService;

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

    private MockMvc restEquipmentBundleMockMvc;

    private EquipmentBundle equipmentBundle;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EquipmentBundleResource equipmentBundleResource = new EquipmentBundleResource(equipmentBundleService);
        this.restEquipmentBundleMockMvc = MockMvcBuilders.standaloneSetup(equipmentBundleResource)
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
    public static EquipmentBundle createEntity(EntityManager em) {
        EquipmentBundle equipmentBundle = new EquipmentBundle()
            .name(DEFAULT_NAME);
        return equipmentBundle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EquipmentBundle createUpdatedEntity(EntityManager em) {
        EquipmentBundle equipmentBundle = new EquipmentBundle()
            .name(UPDATED_NAME);
        return equipmentBundle;
    }

    @BeforeEach
    public void initTest() {
        equipmentBundle = createEntity(em);
    }

    @Test
    @Transactional
    public void createEquipmentBundle() throws Exception {
        int databaseSizeBeforeCreate = equipmentBundleRepository.findAll().size();

        // Create the EquipmentBundle
        restEquipmentBundleMockMvc.perform(post("/api/equipment-bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundle)))
            .andExpect(status().isCreated());

        // Validate the EquipmentBundle in the database
        List<EquipmentBundle> equipmentBundleList = equipmentBundleRepository.findAll();
        assertThat(equipmentBundleList).hasSize(databaseSizeBeforeCreate + 1);
        EquipmentBundle testEquipmentBundle = equipmentBundleList.get(equipmentBundleList.size() - 1);
        assertThat(testEquipmentBundle.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEquipmentBundleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equipmentBundleRepository.findAll().size();

        // Create the EquipmentBundle with an existing ID
        equipmentBundle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEquipmentBundleMockMvc.perform(post("/api/equipment-bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundle)))
            .andExpect(status().isBadRequest());

        // Validate the EquipmentBundle in the database
        List<EquipmentBundle> equipmentBundleList = equipmentBundleRepository.findAll();
        assertThat(equipmentBundleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = equipmentBundleRepository.findAll().size();
        // set the field null
        equipmentBundle.setName(null);

        // Create the EquipmentBundle, which fails.

        restEquipmentBundleMockMvc.perform(post("/api/equipment-bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundle)))
            .andExpect(status().isBadRequest());

        List<EquipmentBundle> equipmentBundleList = equipmentBundleRepository.findAll();
        assertThat(equipmentBundleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEquipmentBundles() throws Exception {
        // Initialize the database
        equipmentBundleRepository.saveAndFlush(equipmentBundle);

        // Get all the equipmentBundleList
        restEquipmentBundleMockMvc.perform(get("/api/equipment-bundles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equipmentBundle.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getEquipmentBundle() throws Exception {
        // Initialize the database
        equipmentBundleRepository.saveAndFlush(equipmentBundle);

        // Get the equipmentBundle
        restEquipmentBundleMockMvc.perform(get("/api/equipment-bundles/{id}", equipmentBundle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(equipmentBundle.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEquipmentBundle() throws Exception {
        // Get the equipmentBundle
        restEquipmentBundleMockMvc.perform(get("/api/equipment-bundles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEquipmentBundle() throws Exception {
        // Initialize the database
        equipmentBundleService.save(equipmentBundle);

        int databaseSizeBeforeUpdate = equipmentBundleRepository.findAll().size();

        // Update the equipmentBundle
        EquipmentBundle updatedEquipmentBundle = equipmentBundleRepository.findById(equipmentBundle.getId()).get();
        // Disconnect from session so that the updates on updatedEquipmentBundle are not directly saved in db
        em.detach(updatedEquipmentBundle);
        updatedEquipmentBundle
            .name(UPDATED_NAME);

        restEquipmentBundleMockMvc.perform(put("/api/equipment-bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEquipmentBundle)))
            .andExpect(status().isOk());

        // Validate the EquipmentBundle in the database
        List<EquipmentBundle> equipmentBundleList = equipmentBundleRepository.findAll();
        assertThat(equipmentBundleList).hasSize(databaseSizeBeforeUpdate);
        EquipmentBundle testEquipmentBundle = equipmentBundleList.get(equipmentBundleList.size() - 1);
        assertThat(testEquipmentBundle.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEquipmentBundle() throws Exception {
        int databaseSizeBeforeUpdate = equipmentBundleRepository.findAll().size();

        // Create the EquipmentBundle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEquipmentBundleMockMvc.perform(put("/api/equipment-bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentBundle)))
            .andExpect(status().isBadRequest());

        // Validate the EquipmentBundle in the database
        List<EquipmentBundle> equipmentBundleList = equipmentBundleRepository.findAll();
        assertThat(equipmentBundleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEquipmentBundle() throws Exception {
        // Initialize the database
        equipmentBundleService.save(equipmentBundle);

        int databaseSizeBeforeDelete = equipmentBundleRepository.findAll().size();

        // Delete the equipmentBundle
        restEquipmentBundleMockMvc.perform(delete("/api/equipment-bundles/{id}", equipmentBundle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EquipmentBundle> equipmentBundleList = equipmentBundleRepository.findAll();
        assertThat(equipmentBundleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EquipmentBundle.class);
        EquipmentBundle equipmentBundle1 = new EquipmentBundle();
        equipmentBundle1.setId(1L);
        EquipmentBundle equipmentBundle2 = new EquipmentBundle();
        equipmentBundle2.setId(equipmentBundle1.getId());
        assertThat(equipmentBundle1).isEqualTo(equipmentBundle2);
        equipmentBundle2.setId(2L);
        assertThat(equipmentBundle1).isNotEqualTo(equipmentBundle2);
        equipmentBundle1.setId(null);
        assertThat(equipmentBundle1).isNotEqualTo(equipmentBundle2);
    }
}
