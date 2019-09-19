package edu.oakland.service.dto;

import edu.oakland.config.Constants;

import edu.oakland.domain.Authority;
import edu.oakland.domain.ExtendedUser;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link edu.oakland.domain.ExtendedUser} entity.
 */
public class ExtendedUserDTO implements Serializable {

    private Long id;

    private Boolean badActor;

    private Long userId;

    private String userLogin;

    public ExtendedUserDTO() {
        // Empty constructor needed for Jackson.
    }

    public ExtendedUserDTO(ExtendedUser extendedUser) {
        this.id = extendedUser.getId();
        this.badActor = extendedUser.isBadActor();
        this.userId = extendedUser.getUser().getId();
        this.userLogin = extendedUser.getUser().getLogin();
   }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isBadActor() {
        return badActor;
    }

    public void setBadActor(Boolean badActor) {
        this.badActor = badActor;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExtendedUserDTO extendedUserDTO = (ExtendedUserDTO) o;
        if (extendedUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), extendedUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExtendedUserDTO{" +
            "id=" + getId() +
            ", badActor='" + isBadActor() + "'" +
            ", userId=" + getUserId() +
            ", userLogin='" + getUserLogin() + "'" +
            "}";
    }
}
