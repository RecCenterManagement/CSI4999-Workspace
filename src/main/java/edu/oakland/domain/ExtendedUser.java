package edu.oakland.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ExtendedUser.
 */
@Entity
@Table(name = "extended_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExtendedUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "bad_actor")
    private Boolean badActor;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isBadActor() {
        return badActor;
    }

    public ExtendedUser badActor(Boolean badActor) {
        this.badActor = badActor;
        return this;
    }

    public void setBadActor(Boolean badActor) {
        this.badActor = badActor;
    }

    public User getUser() {
        return user;
    }

    public ExtendedUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtendedUser)) {
            return false;
        }
        return id != null && id.equals(((ExtendedUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExtendedUser{" +
            "id=" + getId() +
            ", badActor='" + isBadActor() + "'" +
            "}";
    }
}
