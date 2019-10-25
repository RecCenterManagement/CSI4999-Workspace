package edu.oakland.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import edu.oakland.domain.enumeration.ReservationStatus;

/**
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "event", nullable = false)
    private String event;

    @NotNull
    @Column(name = "estimated_participants", nullable = false)
    private Integer estimatedParticipants;

    @NotNull
    @Column(name = "start_time", nullable = false)
    private ZonedDateTime startTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private ZonedDateTime endTime;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ReservationStatus status;

    @ManyToOne
    @JsonIgnoreProperties("reservations")
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "reservation_facilities",
               joinColumns = @JoinColumn(name = "reservation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "facilities_id", referencedColumnName = "id"))
    private Set<Facility> facilities = new HashSet<>();

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnoreProperties("reservation")
    private Set<EquipmentReservation> equipmentReservations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEvent() {
        return event;
    }

    public Reservation event(String event) {
        this.event = event;
        return this;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public Integer getEstimatedParticipants() {
        return estimatedParticipants;
    }

    public Reservation estimatedParticipants(Integer estimatedParticipants) {
        this.estimatedParticipants = estimatedParticipants;
        return this;
    }

    public void setEstimatedParticipants(Integer estimatedParticipants) {
        this.estimatedParticipants = estimatedParticipants;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public Reservation startTime(ZonedDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public Reservation endTime(ZonedDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public Reservation status(ReservationStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public Reservation user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Facility> getFacilities() {
        return facilities;
    }

    public Reservation facilities(Set<Facility> facilities) {
        this.facilities = facilities;
        return this;
    }

    public Reservation addFacilities(Facility facility) {
        this.facilities.add(facility);
        facility.getReservations().add(this);
        return this;
    }

    public Reservation removeFacilities(Facility facility) {
        this.facilities.remove(facility);
        facility.getReservations().remove(this);
        return this;
    }

    public void setFacilities(Set<Facility> facilities) {
        this.facilities = facilities;
    }

    public Set<EquipmentReservation> getEquipmentReservations() {
        return equipmentReservations;
    }

    public Reservation equipmentReservations(Set<EquipmentReservation> equipmentReservations) {
        this.equipmentReservations = equipmentReservations;
        return this;
    }

    public Reservation addEquipmentReservations(EquipmentReservation equipmentReservation) {
        this.equipmentReservations.add(equipmentReservation);
        equipmentReservation.setReservation(this);
        return this;
    }

    public Reservation removeEquipmentReservations(EquipmentReservation equipmentReservation) {
        this.equipmentReservations.remove(equipmentReservation);
        equipmentReservation.setReservation(null);
        return this;
    }

    public void setEquipmentReservations(Set<EquipmentReservation> equipmentReservations) {
        this.equipmentReservations = equipmentReservations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reservation)) {
            return false;
        }
        return id != null && id.equals(((Reservation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", event='" + getEvent() + "'" +
            ", estimatedParticipants=" + getEstimatedParticipants() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
