import React from 'react';
import Event from "./Event";

const EventList = ({events, selected}) => {

    const eventsOfDay = events.filter(each => each.date === selected._d.toString().slice(4,15));

    return(
        eventsOfDay.map(each => (
            <tr key={each.id}>
                <td colSpan="7">
                    <Event {...each}/>
                </td>
            </tr>
        ))
    )
};

export default EventList;