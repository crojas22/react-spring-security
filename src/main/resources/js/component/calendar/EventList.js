import React from 'react';
import Event from "./Event";

const EventList = ({events, selected}) => {

    const eventsPerDay = events.filter(each => each.date === selected._d.toString().slice(4,15));

    return(
        eventsPerDay.map(each => (
            <tr key={each.id}>
                <td colSpan="7" className={"pt-0 " + (each.complete ? "bg-light" : "")}>
                    <Event {...each}/>
                </td>
            </tr>
        ))
    )
};

export default EventList;