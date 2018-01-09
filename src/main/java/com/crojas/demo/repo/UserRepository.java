package com.crojas.demo.repo;

import com.crojas.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<User, Long>{

    User findByUserName(String username);

}
