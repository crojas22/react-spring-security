package com.crojas.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String text, date, startTime, endTime;
    private boolean isComplete;
    private boolean isEditing;

    @JsonIgnore
    @ManyToOne
    private User user;

    protected Event() {
    }

    public Event(String text, String date, String startTime, String endTime) {
        this.text = text;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isComplete = false;
        this.isEditing = false;
    }
}
