package com.crojas.demo.repo;

import com.crojas.demo.domain.Event;
import com.crojas.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(exported = false)
public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findAllByUserOrderByStartTimeAsc(User user);
}
