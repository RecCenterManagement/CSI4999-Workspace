package edu.oakland.web.rest;

import edu.oakland.RecCenterManagementApp;
import edu.oakland.domain.Reservation;
import edu.oakland.domain.User;
import edu.oakland.domain.Facility;
import edu.oakland.domain.EquipmentReservation;
import edu.oakland.repository.ReservationRepository;
import edu.oakland.service.ReservationService;
import edu.oakland.web.rest.errors.ExceptionTranslator;
import edu.oakland.service.dto.ReservationCriteria;
import edu.oakland.service.ReservationQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static edu.oakland.web.rest.TestUtil.sameInstant;
import static edu.oakland.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.oakland.domain.enumeration.ReservationStatus;
/**
 * Integration tests for the {@link ReservationResource} REST controller.
 */
@SpringBootTest(classes = RecCenterManagementApp.class)
public class ReservationResourceIT {

    private static final String DEFAULT_EVENT = "AAAAAAAAAA";
    private static final String UPDATED_EVENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_ESTIMATED_PARTICIPANTS = 1;
    private static final Integer UPDATED_ESTIMATED_PARTICIPANTS = 2;
    private static final Integer SMALLER_ESTIMATED_PARTICIPANTS = 1 - 1;

    private static final ZonedDateTime DEFAULT_START_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_START_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_END_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_END_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ReservationStatus DEFAULT_STATUS = ReservationStatus.APPROVED;
    private static final ReservationStatus UPDATED_STATUS = ReservationStatus.DENIED;

    @Autowired
    private ReservationRepository reservationRepository;

    @Mock
    private ReservationRepository reservationRepositoryMock;

    @Mock
    private ReservationService reservationServiceMock;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReservationQueryService reservationQueryService;

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

    private MockMvc restReservationMockMvc;

    private Reservation reservation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReservationResource reservationResource = new ReservationResource(reservationService, reservationQueryService);
        this.restReservationMockMvc = MockMvcBuilders.standaloneSetup(reservationResource)
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
    public static Reservation createEntity(EntityManager em) {
        Reservation reservation = new Reservation()
            .event(DEFAULT_EVENT)
            .estimatedParticipants(DEFAULT_ESTIMATED_PARTICIPANTS)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .status(DEFAULT_STATUS);
        return reservation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reservation createUpdatedEntity(EntityManager em) {
        Reservation reservation = new Reservation()
            .event(UPDATED_EVENT)
            .estimatedParticipants(UPDATED_ESTIMATED_PARTICIPANTS)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .status(UPDATED_STATUS);
        return reservation;
    }

    @BeforeEach
    public void initTest() {
        reservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createReservation() throws Exception {
        int databaseSizeBeforeCreate = reservationRepository.findAll().size();

        // Create the Reservation
        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isCreated());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeCreate + 1);
        Reservation testReservation = reservationList.get(reservationList.size() - 1);
        assertThat(testReservation.getEvent()).isEqualTo(DEFAULT_EVENT);
        assertThat(testReservation.getEstimatedParticipants()).isEqualTo(DEFAULT_ESTIMATED_PARTICIPANTS);
        assertThat(testReservation.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testReservation.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testReservation.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reservationRepository.findAll().size();

        // Create the Reservation with an existing ID
        reservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEventIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationRepository.findAll().size();
        // set the field null
        reservation.setEvent(null);

        // Create the Reservation, which fails.

        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEstimatedParticipantsIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationRepository.findAll().size();
        // set the field null
        reservation.setEstimatedParticipants(null);

        // Create the Reservation, which fails.

        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationRepository.findAll().size();
        // set the field null
        reservation.setStartTime(null);

        // Create the Reservation, which fails.

        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationRepository.findAll().size();
        // set the field null
        reservation.setEndTime(null);

        // Create the Reservation, which fails.

        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationRepository.findAll().size();
        // set the field null
        reservation.setStatus(null);

        // Create the Reservation, which fails.

        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReservations() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList
        restReservationMockMvc.perform(get("/api/reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].event").value(hasItem(DEFAULT_EVENT)))
            .andExpect(jsonPath("$.[*].estimatedParticipants").value(hasItem(DEFAULT_ESTIMATED_PARTICIPANTS)))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(sameInstant(DEFAULT_START_TIME))))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(sameInstant(DEFAULT_END_TIME))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllReservationsWithEagerRelationshipsIsEnabled() throws Exception {
        ReservationResource reservationResource = new ReservationResource(reservationServiceMock, reservationQueryService);
        when(reservationServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restReservationMockMvc = MockMvcBuilders.standaloneSetup(reservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restReservationMockMvc.perform(get("/api/reservations?eagerload=true"))
        .andExpect(status().isOk());

        verify(reservationServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllReservationsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ReservationResource reservationResource = new ReservationResource(reservationServiceMock, reservationQueryService);
            when(reservationServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restReservationMockMvc = MockMvcBuilders.standaloneSetup(reservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restReservationMockMvc.perform(get("/api/reservations?eagerload=true"))
        .andExpect(status().isOk());

            verify(reservationServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getReservation() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get the reservation
        restReservationMockMvc.perform(get("/api/reservations/{id}", reservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reservation.getId().intValue()))
            .andExpect(jsonPath("$.event").value(DEFAULT_EVENT))
            .andExpect(jsonPath("$.estimatedParticipants").value(DEFAULT_ESTIMATED_PARTICIPANTS))
            .andExpect(jsonPath("$.startTime").value(sameInstant(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.endTime").value(sameInstant(DEFAULT_END_TIME)))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getAllReservationsByEventIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where event equals to DEFAULT_EVENT
        defaultReservationShouldBeFound("event.equals=" + DEFAULT_EVENT);

        // Get all the reservationList where event equals to UPDATED_EVENT
        defaultReservationShouldNotBeFound("event.equals=" + UPDATED_EVENT);
    }

    @Test
    @Transactional
    public void getAllReservationsByEventIsNotEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where event not equals to DEFAULT_EVENT
        defaultReservationShouldNotBeFound("event.notEquals=" + DEFAULT_EVENT);

        // Get all the reservationList where event not equals to UPDATED_EVENT
        defaultReservationShouldBeFound("event.notEquals=" + UPDATED_EVENT);
    }

    @Test
    @Transactional
    public void getAllReservationsByEventIsInShouldWork() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where event in DEFAULT_EVENT or UPDATED_EVENT
        defaultReservationShouldBeFound("event.in=" + DEFAULT_EVENT + "," + UPDATED_EVENT);

        // Get all the reservationList where event equals to UPDATED_EVENT
        defaultReservationShouldNotBeFound("event.in=" + UPDATED_EVENT);
    }

    @Test
    @Transactional
    public void getAllReservationsByEventIsNullOrNotNull() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where event is not null
        defaultReservationShouldBeFound("event.specified=true");

        // Get all the reservationList where event is null
        defaultReservationShouldNotBeFound("event.specified=false");
    }
                @Test
    @Transactional
    public void getAllReservationsByEventContainsSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where event contains DEFAULT_EVENT
        defaultReservationShouldBeFound("event.contains=" + DEFAULT_EVENT);

        // Get all the reservationList where event contains UPDATED_EVENT
        defaultReservationShouldNotBeFound("event.contains=" + UPDATED_EVENT);
    }

    @Test
    @Transactional
    public void getAllReservationsByEventNotContainsSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where event does not contain DEFAULT_EVENT
        defaultReservationShouldNotBeFound("event.doesNotContain=" + DEFAULT_EVENT);

        // Get all the reservationList where event does not contain UPDATED_EVENT
        defaultReservationShouldBeFound("event.doesNotContain=" + UPDATED_EVENT);
    }


    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants equals to DEFAULT_ESTIMATED_PARTICIPANTS
        defaultReservationShouldBeFound("estimatedParticipants.equals=" + DEFAULT_ESTIMATED_PARTICIPANTS);

        // Get all the reservationList where estimatedParticipants equals to UPDATED_ESTIMATED_PARTICIPANTS
        defaultReservationShouldNotBeFound("estimatedParticipants.equals=" + UPDATED_ESTIMATED_PARTICIPANTS);
    }

    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsNotEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants not equals to DEFAULT_ESTIMATED_PARTICIPANTS
        defaultReservationShouldNotBeFound("estimatedParticipants.notEquals=" + DEFAULT_ESTIMATED_PARTICIPANTS);

        // Get all the reservationList where estimatedParticipants not equals to UPDATED_ESTIMATED_PARTICIPANTS
        defaultReservationShouldBeFound("estimatedParticipants.notEquals=" + UPDATED_ESTIMATED_PARTICIPANTS);
    }

    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsInShouldWork() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants in DEFAULT_ESTIMATED_PARTICIPANTS or UPDATED_ESTIMATED_PARTICIPANTS
        defaultReservationShouldBeFound("estimatedParticipants.in=" + DEFAULT_ESTIMATED_PARTICIPANTS + "," + UPDATED_ESTIMATED_PARTICIPANTS);

        // Get all the reservationList where estimatedParticipants equals to UPDATED_ESTIMATED_PARTICIPANTS
        defaultReservationShouldNotBeFound("estimatedParticipants.in=" + UPDATED_ESTIMATED_PARTICIPANTS);
    }

    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsNullOrNotNull() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants is not null
        defaultReservationShouldBeFound("estimatedParticipants.specified=true");

        // Get all the reservationList where estimatedParticipants is null
        defaultReservationShouldNotBeFound("estimatedParticipants.specified=false");
    }

    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants is greater than or equal to DEFAULT_ESTIMATED_PARTICIPANTS
        defaultReservationShouldBeFound("estimatedParticipants.greaterThanOrEqual=" + DEFAULT_ESTIMATED_PARTICIPANTS);

        // Get all the reservationList where estimatedParticipants is greater than or equal to UPDATED_ESTIMATED_PARTICIPANTS
        defaultReservationShouldNotBeFound("estimatedParticipants.greaterThanOrEqual=" + UPDATED_ESTIMATED_PARTICIPANTS);
    }

    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants is less than or equal to DEFAULT_ESTIMATED_PARTICIPANTS
        defaultReservationShouldBeFound("estimatedParticipants.lessThanOrEqual=" + DEFAULT_ESTIMATED_PARTICIPANTS);

        // Get all the reservationList where estimatedParticipants is less than or equal to SMALLER_ESTIMATED_PARTICIPANTS
        defaultReservationShouldNotBeFound("estimatedParticipants.lessThanOrEqual=" + SMALLER_ESTIMATED_PARTICIPANTS);
    }

    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsLessThanSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants is less than DEFAULT_ESTIMATED_PARTICIPANTS
        defaultReservationShouldNotBeFound("estimatedParticipants.lessThan=" + DEFAULT_ESTIMATED_PARTICIPANTS);

        // Get all the reservationList where estimatedParticipants is less than UPDATED_ESTIMATED_PARTICIPANTS
        defaultReservationShouldBeFound("estimatedParticipants.lessThan=" + UPDATED_ESTIMATED_PARTICIPANTS);
    }

    @Test
    @Transactional
    public void getAllReservationsByEstimatedParticipantsIsGreaterThanSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where estimatedParticipants is greater than DEFAULT_ESTIMATED_PARTICIPANTS
        defaultReservationShouldNotBeFound("estimatedParticipants.greaterThan=" + DEFAULT_ESTIMATED_PARTICIPANTS);

        // Get all the reservationList where estimatedParticipants is greater than SMALLER_ESTIMATED_PARTICIPANTS
        defaultReservationShouldBeFound("estimatedParticipants.greaterThan=" + SMALLER_ESTIMATED_PARTICIPANTS);
    }


    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime equals to DEFAULT_START_TIME
        defaultReservationShouldBeFound("startTime.equals=" + DEFAULT_START_TIME);

        // Get all the reservationList where startTime equals to UPDATED_START_TIME
        defaultReservationShouldNotBeFound("startTime.equals=" + UPDATED_START_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime not equals to DEFAULT_START_TIME
        defaultReservationShouldNotBeFound("startTime.notEquals=" + DEFAULT_START_TIME);

        // Get all the reservationList where startTime not equals to UPDATED_START_TIME
        defaultReservationShouldBeFound("startTime.notEquals=" + UPDATED_START_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsInShouldWork() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime in DEFAULT_START_TIME or UPDATED_START_TIME
        defaultReservationShouldBeFound("startTime.in=" + DEFAULT_START_TIME + "," + UPDATED_START_TIME);

        // Get all the reservationList where startTime equals to UPDATED_START_TIME
        defaultReservationShouldNotBeFound("startTime.in=" + UPDATED_START_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsNullOrNotNull() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime is not null
        defaultReservationShouldBeFound("startTime.specified=true");

        // Get all the reservationList where startTime is null
        defaultReservationShouldNotBeFound("startTime.specified=false");
    }

    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime is greater than or equal to DEFAULT_START_TIME
        defaultReservationShouldBeFound("startTime.greaterThanOrEqual=" + DEFAULT_START_TIME);

        // Get all the reservationList where startTime is greater than or equal to UPDATED_START_TIME
        defaultReservationShouldNotBeFound("startTime.greaterThanOrEqual=" + UPDATED_START_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime is less than or equal to DEFAULT_START_TIME
        defaultReservationShouldBeFound("startTime.lessThanOrEqual=" + DEFAULT_START_TIME);

        // Get all the reservationList where startTime is less than or equal to SMALLER_START_TIME
        defaultReservationShouldNotBeFound("startTime.lessThanOrEqual=" + SMALLER_START_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsLessThanSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime is less than DEFAULT_START_TIME
        defaultReservationShouldNotBeFound("startTime.lessThan=" + DEFAULT_START_TIME);

        // Get all the reservationList where startTime is less than UPDATED_START_TIME
        defaultReservationShouldBeFound("startTime.lessThan=" + UPDATED_START_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByStartTimeIsGreaterThanSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where startTime is greater than DEFAULT_START_TIME
        defaultReservationShouldNotBeFound("startTime.greaterThan=" + DEFAULT_START_TIME);

        // Get all the reservationList where startTime is greater than SMALLER_START_TIME
        defaultReservationShouldBeFound("startTime.greaterThan=" + SMALLER_START_TIME);
    }


    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime equals to DEFAULT_END_TIME
        defaultReservationShouldBeFound("endTime.equals=" + DEFAULT_END_TIME);

        // Get all the reservationList where endTime equals to UPDATED_END_TIME
        defaultReservationShouldNotBeFound("endTime.equals=" + UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime not equals to DEFAULT_END_TIME
        defaultReservationShouldNotBeFound("endTime.notEquals=" + DEFAULT_END_TIME);

        // Get all the reservationList where endTime not equals to UPDATED_END_TIME
        defaultReservationShouldBeFound("endTime.notEquals=" + UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsInShouldWork() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime in DEFAULT_END_TIME or UPDATED_END_TIME
        defaultReservationShouldBeFound("endTime.in=" + DEFAULT_END_TIME + "," + UPDATED_END_TIME);

        // Get all the reservationList where endTime equals to UPDATED_END_TIME
        defaultReservationShouldNotBeFound("endTime.in=" + UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsNullOrNotNull() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime is not null
        defaultReservationShouldBeFound("endTime.specified=true");

        // Get all the reservationList where endTime is null
        defaultReservationShouldNotBeFound("endTime.specified=false");
    }

    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime is greater than or equal to DEFAULT_END_TIME
        defaultReservationShouldBeFound("endTime.greaterThanOrEqual=" + DEFAULT_END_TIME);

        // Get all the reservationList where endTime is greater than or equal to UPDATED_END_TIME
        defaultReservationShouldNotBeFound("endTime.greaterThanOrEqual=" + UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime is less than or equal to DEFAULT_END_TIME
        defaultReservationShouldBeFound("endTime.lessThanOrEqual=" + DEFAULT_END_TIME);

        // Get all the reservationList where endTime is less than or equal to SMALLER_END_TIME
        defaultReservationShouldNotBeFound("endTime.lessThanOrEqual=" + SMALLER_END_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsLessThanSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime is less than DEFAULT_END_TIME
        defaultReservationShouldNotBeFound("endTime.lessThan=" + DEFAULT_END_TIME);

        // Get all the reservationList where endTime is less than UPDATED_END_TIME
        defaultReservationShouldBeFound("endTime.lessThan=" + UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void getAllReservationsByEndTimeIsGreaterThanSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where endTime is greater than DEFAULT_END_TIME
        defaultReservationShouldNotBeFound("endTime.greaterThan=" + DEFAULT_END_TIME);

        // Get all the reservationList where endTime is greater than SMALLER_END_TIME
        defaultReservationShouldBeFound("endTime.greaterThan=" + SMALLER_END_TIME);
    }


    @Test
    @Transactional
    public void getAllReservationsByStatusIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where status equals to DEFAULT_STATUS
        defaultReservationShouldBeFound("status.equals=" + DEFAULT_STATUS);

        // Get all the reservationList where status equals to UPDATED_STATUS
        defaultReservationShouldNotBeFound("status.equals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void getAllReservationsByStatusIsNotEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where status not equals to DEFAULT_STATUS
        defaultReservationShouldNotBeFound("status.notEquals=" + DEFAULT_STATUS);

        // Get all the reservationList where status not equals to UPDATED_STATUS
        defaultReservationShouldBeFound("status.notEquals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void getAllReservationsByStatusIsInShouldWork() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where status in DEFAULT_STATUS or UPDATED_STATUS
        defaultReservationShouldBeFound("status.in=" + DEFAULT_STATUS + "," + UPDATED_STATUS);

        // Get all the reservationList where status equals to UPDATED_STATUS
        defaultReservationShouldNotBeFound("status.in=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void getAllReservationsByStatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList where status is not null
        defaultReservationShouldBeFound("status.specified=true");

        // Get all the reservationList where status is null
        defaultReservationShouldNotBeFound("status.specified=false");
    }

    @Test
    @Transactional
    public void getAllReservationsByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        reservation.setUser(user);
        reservationRepository.saveAndFlush(reservation);
        Long userId = user.getId();

        // Get all the reservationList where user equals to userId
        defaultReservationShouldBeFound("userId.equals=" + userId);

        // Get all the reservationList where user equals to userId + 1
        defaultReservationShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllReservationsByFacilitiesIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);
        Facility facilities = FacilityResourceIT.createEntity(em);
        em.persist(facilities);
        em.flush();
        reservation.addFacilities(facilities);
        reservationRepository.saveAndFlush(reservation);
        Long facilitiesId = facilities.getId();

        // Get all the reservationList where facilities equals to facilitiesId
        defaultReservationShouldBeFound("facilitiesId.equals=" + facilitiesId);

        // Get all the reservationList where facilities equals to facilitiesId + 1
        defaultReservationShouldNotBeFound("facilitiesId.equals=" + (facilitiesId + 1));
    }


    @Test
    @Transactional
    public void getAllReservationsByEquipmentReservationsIsEqualToSomething() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);
        EquipmentReservation equipmentReservations = EquipmentReservationResourceIT.createEntity(em);
        em.persist(equipmentReservations);
        em.flush();
        reservation.addEquipmentReservations(equipmentReservations);
        reservationRepository.saveAndFlush(reservation);
        Long equipmentReservationsId = equipmentReservations.getId();

        // Get all the reservationList where equipmentReservations equals to equipmentReservationsId
        defaultReservationShouldBeFound("equipmentReservationsId.equals=" + equipmentReservationsId);

        // Get all the reservationList where equipmentReservations equals to equipmentReservationsId + 1
        defaultReservationShouldNotBeFound("equipmentReservationsId.equals=" + (equipmentReservationsId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultReservationShouldBeFound(String filter) throws Exception {
        restReservationMockMvc.perform(get("/api/reservations?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].event").value(hasItem(DEFAULT_EVENT)))
            .andExpect(jsonPath("$.[*].estimatedParticipants").value(hasItem(DEFAULT_ESTIMATED_PARTICIPANTS)))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(sameInstant(DEFAULT_START_TIME))))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(sameInstant(DEFAULT_END_TIME))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));

        // Check, that the count call also returns 1
        restReservationMockMvc.perform(get("/api/reservations/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultReservationShouldNotBeFound(String filter) throws Exception {
        restReservationMockMvc.perform(get("/api/reservations?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restReservationMockMvc.perform(get("/api/reservations/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingReservation() throws Exception {
        // Get the reservation
        restReservationMockMvc.perform(get("/api/reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReservation() throws Exception {
        // Initialize the database
        reservationService.save(reservation);

        int databaseSizeBeforeUpdate = reservationRepository.findAll().size();

        // Update the reservation
        Reservation updatedReservation = reservationRepository.findById(reservation.getId()).get();
        // Disconnect from session so that the updates on updatedReservation are not directly saved in db
        em.detach(updatedReservation);
        updatedReservation
            .event(UPDATED_EVENT)
            .estimatedParticipants(UPDATED_ESTIMATED_PARTICIPANTS)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .status(UPDATED_STATUS);

        restReservationMockMvc.perform(put("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReservation)))
            .andExpect(status().isOk());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeUpdate);
        Reservation testReservation = reservationList.get(reservationList.size() - 1);
        assertThat(testReservation.getEvent()).isEqualTo(UPDATED_EVENT);
        assertThat(testReservation.getEstimatedParticipants()).isEqualTo(UPDATED_ESTIMATED_PARTICIPANTS);
        assertThat(testReservation.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testReservation.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testReservation.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingReservation() throws Exception {
        int databaseSizeBeforeUpdate = reservationRepository.findAll().size();

        // Create the Reservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReservationMockMvc.perform(put("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReservation() throws Exception {
        // Initialize the database
        reservationService.save(reservation);

        int databaseSizeBeforeDelete = reservationRepository.findAll().size();

        // Delete the reservation
        restReservationMockMvc.perform(delete("/api/reservations/{id}", reservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reservation.class);
        Reservation reservation1 = new Reservation();
        reservation1.setId(1L);
        Reservation reservation2 = new Reservation();
        reservation2.setId(reservation1.getId());
        assertThat(reservation1).isEqualTo(reservation2);
        reservation2.setId(2L);
        assertThat(reservation1).isNotEqualTo(reservation2);
        reservation1.setId(null);
        assertThat(reservation1).isNotEqualTo(reservation2);
    }
}
