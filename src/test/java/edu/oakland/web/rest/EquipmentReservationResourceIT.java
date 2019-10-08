package edu.oakland.web.rest;

import edu.oakland.RecCenterManagementApp;
import edu.oakland.domain.EquipmentReservation;
import edu.oakland.domain.Equipment;
import edu.oakland.repository.EquipmentReservationRepository;
import edu.oakland.service.EquipmentReservationService;
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
 * Integration tests for the {@link EquipmentReservationResource} REST controller.
 */
@SpringBootTest(classes = RecCenterManagementApp.class)
public class EquipmentReservationResourceIT {

    private static final Integer DEFAULT_COUNT = 0;
    private static final Integer UPDATED_COUNT = 1;
    private static final Integer SMALLER_COUNT = 0 - 1;

    @Autowired
    private EquipmentReservationRepository equipmentReservationRepository;

    @Autowired
    private EquipmentReservationService equipmentReservationService;

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

    private MockMvc restEquipmentReservationMockMvc;

    private EquipmentReservation equipmentReservation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EquipmentReservationResource equipmentReservationResource = new EquipmentReservationResource(equipmentReservationService);
        this.restEquipmentReservationMockMvc = MockMvcBuilders.standaloneSetup(equipmentReservationResource)
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
    public static EquipmentReservation createEntity(EntityManager em) {
        EquipmentReservation equipmentReservation = new EquipmentReservation()
            .count(DEFAULT_COUNT);
        // Add required entity
        Equipment equipment;
        if (TestUtil.findAll(em, Equipment.class).isEmpty()) {
            equipment = EquipmentResourceIT.createEntity(em);
            em.persist(equipment);
            em.flush();
        } else {
            equipment = TestUtil.findAll(em, Equipment.class).get(0);
        }
        equipmentReservation.setEquipment(equipment);
        return equipmentReservation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EquipmentReservation createUpdatedEntity(EntityManager em) {
        EquipmentReservation equipmentReservation = new EquipmentReservation()
            .count(UPDATED_COUNT);
        // Add required entity
        Equipment equipment;
        if (TestUtil.findAll(em, Equipment.class).isEmpty()) {
            equipment = EquipmentResourceIT.createUpdatedEntity(em);
            em.persist(equipment);
            em.flush();
        } else {
            equipment = TestUtil.findAll(em, Equipment.class).get(0);
        }
        equipmentReservation.setEquipment(equipment);
        return equipmentReservation;
    }

    @BeforeEach
    public void initTest() {
        equipmentReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createEquipmentReservation() throws Exception {
        int databaseSizeBeforeCreate = equipmentReservationRepository.findAll().size();

        // Create the EquipmentReservation
        restEquipmentReservationMockMvc.perform(post("/api/equipment-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentReservation)))
            .andExpect(status().isCreated());

        // Validate the EquipmentReservation in the database
        List<EquipmentReservation> equipmentReservationList = equipmentReservationRepository.findAll();
        assertThat(equipmentReservationList).hasSize(databaseSizeBeforeCreate + 1);
        EquipmentReservation testEquipmentReservation = equipmentReservationList.get(equipmentReservationList.size() - 1);
        assertThat(testEquipmentReservation.getCount()).isEqualTo(DEFAULT_COUNT);
    }

    @Test
    @Transactional
    public void createEquipmentReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equipmentReservationRepository.findAll().size();

        // Create the EquipmentReservation with an existing ID
        equipmentReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEquipmentReservationMockMvc.perform(post("/api/equipment-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentReservation)))
            .andExpect(status().isBadRequest());

        // Validate the EquipmentReservation in the database
        List<EquipmentReservation> equipmentReservationList = equipmentReservationRepository.findAll();
        assertThat(equipmentReservationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCountIsRequired() throws Exception {
        int databaseSizeBeforeTest = equipmentReservationRepository.findAll().size();
        // set the field null
        equipmentReservation.setCount(null);

        // Create the EquipmentReservation, which fails.

        restEquipmentReservationMockMvc.perform(post("/api/equipment-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentReservation)))
            .andExpect(status().isBadRequest());

        List<EquipmentReservation> equipmentReservationList = equipmentReservationRepository.findAll();
        assertThat(equipmentReservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEquipmentReservations() throws Exception {
        // Initialize the database
        equipmentReservationRepository.saveAndFlush(equipmentReservation);

        // Get all the equipmentReservationList
        restEquipmentReservationMockMvc.perform(get("/api/equipment-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equipmentReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT)));
    }
    
    @Test
    @Transactional
    public void getEquipmentReservation() throws Exception {
        // Initialize the database
        equipmentReservationRepository.saveAndFlush(equipmentReservation);

        // Get the equipmentReservation
        restEquipmentReservationMockMvc.perform(get("/api/equipment-reservations/{id}", equipmentReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(equipmentReservation.getId().intValue()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingEquipmentReservation() throws Exception {
        // Get the equipmentReservation
        restEquipmentReservationMockMvc.perform(get("/api/equipment-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEquipmentReservation() throws Exception {
        // Initialize the database
        equipmentReservationService.save(equipmentReservation);

        int databaseSizeBeforeUpdate = equipmentReservationRepository.findAll().size();

        // Update the equipmentReservation
        EquipmentReservation updatedEquipmentReservation = equipmentReservationRepository.findById(equipmentReservation.getId()).get();
        // Disconnect from session so that the updates on updatedEquipmentReservation are not directly saved in db
        em.detach(updatedEquipmentReservation);
        updatedEquipmentReservation
            .count(UPDATED_COUNT);

        restEquipmentReservationMockMvc.perform(put("/api/equipment-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEquipmentReservation)))
            .andExpect(status().isOk());

        // Validate the EquipmentReservation in the database
        List<EquipmentReservation> equipmentReservationList = equipmentReservationRepository.findAll();
        assertThat(equipmentReservationList).hasSize(databaseSizeBeforeUpdate);
        EquipmentReservation testEquipmentReservation = equipmentReservationList.get(equipmentReservationList.size() - 1);
        assertThat(testEquipmentReservation.getCount()).isEqualTo(UPDATED_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingEquipmentReservation() throws Exception {
        int databaseSizeBeforeUpdate = equipmentReservationRepository.findAll().size();

        // Create the EquipmentReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEquipmentReservationMockMvc.perform(put("/api/equipment-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipmentReservation)))
            .andExpect(status().isBadRequest());

        // Validate the EquipmentReservation in the database
        List<EquipmentReservation> equipmentReservationList = equipmentReservationRepository.findAll();
        assertThat(equipmentReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEquipmentReservation() throws Exception {
        // Initialize the database
        equipmentReservationService.save(equipmentReservation);

        int databaseSizeBeforeDelete = equipmentReservationRepository.findAll().size();

        // Delete the equipmentReservation
        restEquipmentReservationMockMvc.perform(delete("/api/equipment-reservations/{id}", equipmentReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EquipmentReservation> equipmentReservationList = equipmentReservationRepository.findAll();
        assertThat(equipmentReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EquipmentReservation.class);
        EquipmentReservation equipmentReservation1 = new EquipmentReservation();
        equipmentReservation1.setId(1L);
        EquipmentReservation equipmentReservation2 = new EquipmentReservation();
        equipmentReservation2.setId(equipmentReservation1.getId());
        assertThat(equipmentReservation1).isEqualTo(equipmentReservation2);
        equipmentReservation2.setId(2L);
        assertThat(equipmentReservation1).isNotEqualTo(equipmentReservation2);
        equipmentReservation1.setId(null);
        assertThat(equipmentReservation1).isNotEqualTo(equipmentReservation2);
    }
}
