package edu.oakland.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "equipmentBundle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EquipmentBundleClaim> claims = new HashSet<>();

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
