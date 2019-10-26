package edu.oakland.domain;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EquipmentBundleClaim.
 */
@Entity
@Table(name = "equipment_bundle_claim")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EquipmentBundleClaim implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "count", nullable = false)
    private Integer count;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("claims")
    private EquipmentBundle equipmentBundle;

    @ManyToOne(optional = false)
    @NotNull
    private Equipment equipment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCount() {
        return count;
    }

    public EquipmentBundleClaim count(Integer count) {
        this.count = count;
        return this;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public EquipmentBundle getEquipmentBundle() {
        return equipmentBundle;
    }

    public EquipmentBundleClaim equipmentBundle(EquipmentBundle equipmentBundle) {
        this.equipmentBundle = equipmentBundle;
        return this;
    }

    public void setEquipmentBundle(EquipmentBundle equipmentBundle) {
        this.equipmentBundle = equipmentBundle;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public EquipmentBundleClaim equipment(Equipment equipment) {
        this.equipment = equipment;
        return this;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EquipmentBundleClaim)) {
            return false;
        }
        return id != null && id.equals(((EquipmentBundleClaim) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EquipmentBundleClaim{" +
            "id=" + getId() +
            ", count=" + getCount() +
            "}";
    }
}
