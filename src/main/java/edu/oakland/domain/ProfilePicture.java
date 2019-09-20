package edu.oakland.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A ProfilePicture.
 */
@Entity
@Table(name = "profile_picture")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProfilePicture implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Lob
    @Column(name = "image_data", nullable = false)
    private byte[] imageData;

    @Column(name = "image_data_content_type", nullable = false)
    private String imageDataContentType;

    @OneToOne(optional = false)    
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public ProfilePicture imageData(byte[] imageData) {
        this.imageData = imageData;
        return this;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getImageDataContentType() {
        return imageDataContentType;
    }

    public ProfilePicture imageDataContentType(String imageDataContentType) {
        this.imageDataContentType = imageDataContentType;
        return this;
    }

    public void setImageDataContentType(String imageDataContentType) {
        this.imageDataContentType = imageDataContentType;
    }

    public User getUser() {
        return user;
    }

    public ProfilePicture user(User user) {
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
        if (!(o instanceof ProfilePicture)) {
            return false;
        }
        return id != null && id.equals(((ProfilePicture) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProfilePicture{" +
            "id=" + getId() +
            ", imageData='" + getImageData() + "'" +
            ", imageDataContentType='" + getImageDataContentType() + "'" +
            "}";
    }
}
