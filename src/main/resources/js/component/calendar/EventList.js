import React from 'react';
import Event from "./Event";

const EventList = ({events}) => {

    return(
        events.map(each => (
            <tr key={each.id}>
                <td colSpan="7" className={"pt-0 " + (each.complete ? "bg-light" : "")}>
                    <Event {...each}/>
                </td>
            </tr>
        ))
    )
};

export default EventList;