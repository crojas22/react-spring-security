package com.crojas.demo.repo;

import com.crojas.demo.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(exported = false)
public interface EventRepository extends JpaRepository<Event, Long> {
//    @Query(value = "select t from Event t where t.user.userName = :#{ principal?.username }")
//    List<Event> findAllOrOrderByDate();
}
