package edu.oakland.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EquipmentBundle.
 */
@Entity
@Table(name = "equipment_bundle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EquipmentBundle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 1)
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "equipmentBundle", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true )
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnoreProperties("equipmentBundle")
    private Set<EquipmentBundleClaim> claims = new HashSet<>();

    @ManyToMany(mappedBy = "equipmentBundles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Facility> facilities = new HashSet<>();

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

    public EquipmentBundle name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<EquipmentBundleClaim> getClaims() {
        return claims;
    }

    public EquipmentBundle claims(Set<EquipmentBundleClaim> equipmentBundleClaims) {
        this.claims = equipmentBundleClaims;
        return this;
    }

    public EquipmentBundle addClaims(EquipmentBundleClaim equipmentBundleClaim) {
        this.claims.add(equipmentBundleClaim);
        equipmentBundleClaim.setEquipmentBundle(this);
        return this;
    }

    public EquipmentBundle removeClaims(EquipmentBundleClaim equipmentBundleClaim) {
        this.claims.remove(equipmentBundleClaim);
        equipmentBundleClaim.setEquipmentBundle(null);
        return this;
    }

    public void setClaims(Set<EquipmentBundleClaim> equipmentBundleClaims) {
        this.claims = equipmentBundleClaims;
    }

    public Set<Facility> getFacilities() {
        return facilities;
    }

    public EquipmentBundle facilities(Set<Facility> facilities) {
        this.facilities = facilities;
        return this;
    }

    public EquipmentBundle addFacilities(Facility facility) {
        this.facilities.add(facility);
        facility.getEquipmentBundles().add(this);
        return this;
    }

    public EquipmentBundle removeFacilities(Facility facility) {
        this.facilities.remove(facility);
        facility.getEquipmentBundles().remove(this);
        return this;
    }

    public void setFacilities(Set<Facility> facilities) {
        this.facilities = facilities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EquipmentBundle)) {
            return false;
        }
        return id != null && id.equals(((EquipmentBundle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EquipmentBundle{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
