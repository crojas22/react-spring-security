import React from 'react';

const Week = props => {

    const totalEvents = args => {
        const total = props.events.filter(each => each.date === args.toString().slice(4,15)).length;
        if (total > 0) return <span className='week-span py-1 px-2 badge badge-light bg-primary'>{total}</span>
    };

    const renderDays = () => {
        let days = [],
            date = props.date,
            month = props.month,
            i = 0;
        for (i; i < 7; i++) {
            let day = {
                number: date.date(),
                date,
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day")
            };
            days.push(
                <td key={i} onClick={() => props.changeState("select", day.date)} className={"text-center td "
                    + (day.date.isSame(props.selected._d) ? " bg-lightBlue text-white " : "")
                    + (day.isCurrentMonth ? "" : " text-muted bg-light ") + (day.isToday ? " text-primary " : "")}>

                    {
                        day.number
                    }

                    {
                        totalEvents(day.date._d)
                    }

                </td>
            );
            date = date.clone();
            date.add(1, "d");
        }

        return days;
    };

    return(
        <tr>
            {
                renderDays()
            }
        </tr>
    )
};

export default Week;