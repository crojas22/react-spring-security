package com.crojas.demo.service;

import com.crojas.demo.domain.Event;
import com.crojas.demo.domain.User;
import com.crojas.demo.repo.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findUserEvents(User user) {
        return this.eventRepository.findAllByUserOrderByStartTimeAsc(user);
    }

    public void removeEvent(Integer id) {
        this.eventRepository.delete(id);
    }

    public void completeEvent(Integer id) {
        Event event = this.eventRepository.findOne(id);
        event.setComplete(!event.isComplete());
        this.eventRepository.save(event);
    }

    public void editEvent(Event event) {
        Event dbEvent = this.eventRepository.findOne(event.getId());
        if (event.getText() != null) {
            dbEvent.setText(event.getText());
        }
        this.eventRepository.save(dbEvent);
    }

}
