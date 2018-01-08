import React from 'react';

const Week = props => {

    const renderDays = () => {
        let days = [],
            date = props.date,
            month = props.month,
            i = 0;
        for (i; i < 7; i++) {
            let day = {
                number: date.date(),
                date,
                isCurrentMonth: date.month() === month.month,
                isToday: date.isSame(new Date(), "day")
            };
            days.push(
                <td className="text-center" key={i}>
                    {
                        day.number
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