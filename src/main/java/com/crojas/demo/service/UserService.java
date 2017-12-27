package com.crojas.demo.service;

import com.crojas.demo.domain.Role;
import com.crojas.demo.domain.User;
import com.crojas.demo.domain.UserDto;
import com.crojas.demo.repo.RoleRepository;
import com.crojas.demo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User createUser(User user) {
        Role userRole = this.roleRepository.findByName("ROLE_USER");
        if (userRole != null){
            user.addRole(userRole);
            userRole.addUser(user);
        } else {
            Role role = new Role("ROLE_USER");
            role.addUser(user);
            user.addRole(role);
        }
        user.setEnabled(true);
        return this.userRepository.save(user);
    }

    public UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }
        return user;
    }
}
