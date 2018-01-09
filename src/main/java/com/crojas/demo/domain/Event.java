package com.crojas.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
public class Event extends BaseEntity{
    @NotNull
    private String text, date, startTime, endTime;

    @ManyToOne
    private User user;

    protected Event() {
    }

    public Event(String text, String date, String startTime, String endTime) {
        this.text = text;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
