package com.crojas.demo.repo;

import com.crojas.demo.domain.Contact;
import com.crojas.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(exported = false)
public interface ContactRepository extends JpaRepository<Contact, Integer> {

    List<Contact> findAllByUserOrderByFirstNameAsc(User user);

    @Override
    @PreAuthorize("@contactRepository.findOne(#id)?.user?.userName == authentication.name")
    void delete(@Param("id") Integer id);
}
