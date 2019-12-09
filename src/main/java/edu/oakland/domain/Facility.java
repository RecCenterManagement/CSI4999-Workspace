package edu.oakland.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Facility.
 */
@Entity
@Table(name = "facility")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Facility implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @NotNull
    @Min(value = 0)
    @Column(name = "footage", nullable = false)
    private Integer footage;

    @Min(value = 0)
    @Column(name = "capacity")
    private Integer capacity;

    @Size(max = 180)
    @Column(name = "av_support", length = 180)
    private String avSupport;

    @NotNull
    @Column(name = "food_allowed", nullable = false)
    private Boolean foodAllowed;

    @Column(name = "color_code")
    private String colorCode;

    @Size(max = 1000)
    @Column(name = "description", length = 1000)
    private String description;

    @ManyToMany(mappedBy = "facilities")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Reservation> reservations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "facility_equipment_bundles",
               joinColumns = @JoinColumn(name = "facility_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "equipment_bundles_id", referencedColumnName = "id"))
    private Set<EquipmentBundle> equipmentBundles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Facility name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getFootage() {
        return footage;
    }

    public Facility footage(Integer footage) {
        this.footage = footage;
        return this;
    }

    public void setFootage(Integer footage) {
        this.footage = footage;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Facility capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getAvSupport() {
        return avSupport;
    }

    public Facility avSupport(String avSupport) {
        this.avSupport = avSupport;
        return this;
    }

    public void setAvSupport(String avSupport) {
        this.avSupport = avSupport;
    }

    public Boolean isFoodAllowed() {
        return foodAllowed;
    }

    public Facility foodAllowed(Boolean foodAllowed) {
        this.foodAllowed = foodAllowed;
        return this;
    }

    public void setFoodAllowed(Boolean foodAllowed) {
        this.foodAllowed = foodAllowed;
    }

    public String getColorCode() {
        return colorCode;
    }

    public Facility colorCode(String colorCode) {
        this.colorCode = colorCode;
        return this;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public String getDescription() {
        return description;
    }

    public Facility description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public Facility reservations(Set<Reservation> reservations) {
        this.reservations = reservations;
        return this;
    }

    public Facility addReservations(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.getFacilities().add(this);
        return this;
    }

    public Facility removeReservations(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.getFacilities().remove(this);
        return this;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Set<EquipmentBundle> getEquipmentBundles() {
        return equipmentBundles;
    }

    public Facility equipmentBundles(Set<EquipmentBundle> equipmentBundles) {
        this.equipmentBundles = equipmentBundles;
        return this;
    }

    public Facility addEquipmentBundles(EquipmentBundle equipmentBundle) {
        this.equipmentBundles.add(equipmentBundle);
        equipmentBundle.getFacilities().add(this);
        return this;
    }

    public Facility removeEquipmentBundles(EquipmentBundle equipmentBundle) {
        this.equipmentBundles.remove(equipmentBundle);
        equipmentBundle.getFacilities().remove(this);
        return this;
    }

    public void setEquipmentBundles(Set<EquipmentBundle> equipmentBundles) {
        this.equipmentBundles = equipmentBundles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facility)) {
            return false;
        }
        return id != null && id.equals(((Facility) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Facility{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", footage=" + getFootage() +
            ", capacity=" + getCapacity() +
            ", avSupport='" + getAvSupport() + "'" +
            ", foodAllowed='" + isFoodAllowed() + "'" +
            ", colorCode='" + getColorCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
