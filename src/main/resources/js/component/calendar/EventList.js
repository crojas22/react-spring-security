import React from 'react';

const EventList = ({events, selected}) => {

    const eventsOfDay = events.filter(each => each.date === selected._d.toString().slice(4,15));

    return(
        eventsOfDay.map(({id, text, date, startTime, endTime}) => (
            <tr key={id}>
                <td colSpan="7">
                    <p className="m-0">
                        {
                            text
                        }
                    </p>
                </td>
            </tr>
        ))
    )
};

export default EventList;