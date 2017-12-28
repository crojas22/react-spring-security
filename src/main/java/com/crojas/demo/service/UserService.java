package com.crojas.demo.service;

import com.crojas.demo.domain.Role;
import com.crojas.demo.domain.User;
import com.crojas.demo.domain.UserDto;
import com.crojas.demo.exception.UsernameExistsException;
import com.crojas.demo.repo.RoleRepository;
import com.crojas.demo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public void createUser(User user, String roleName) throws UsernameExistsException {
        Role userRole = this.roleRepository.findByName(roleName);

        if (this.userRepository.findByUserName(user.getUsername()) != null) {
            throw new UsernameExistsException("There is an account with that email: " + user.getUsername());
        } else {
            if (userRole != null){
                user.addRole(userRole);
                userRole.addUser(user);
            } else {
                Role role = new Role(roleName);
                role.addUser(user);
                user.addRole(role);
            }
            user.setEnabled(true);
            this.userRepository.save(user);
        }
    }

    public UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }
        return user;
    }
}
