package edu.oakland.service.mapper;

import edu.oakland.domain.*;
import edu.oakland.service.dto.ExtendedUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ExtendedUser} and its DTO {@link ExtendedUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ExtendedUserMapper extends EntityMapper<ExtendedUserDTO, ExtendedUser> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    ExtendedUserDTO toDto(ExtendedUser extendedUser);

    @Mapping(source = "userId", target = "user")
    ExtendedUser toEntity(ExtendedUserDTO extendedUserDTO);

    default ExtendedUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        ExtendedUser extendedUser = new ExtendedUser();
        extendedUser.setId(id);
        return extendedUser;
    }
}
