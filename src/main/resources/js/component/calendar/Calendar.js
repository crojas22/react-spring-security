import React from 'react';
import moment from 'moment';
import {BtnInput} from "../reusable/Buttons";

class Calendar extends React.Component {
    state = {
        month : moment(),
        select: moment()
    };

    renderLabel = (format, month) => <span className='py-4 d-inline-block text-white'>{month.format(format)}</span>;

    renderDaysOfWeek = array => array.map(day => <th className="text-center" key={day}>{day.slice(0,3)}</th>);

    render() {
        return(
            <table className="calendar table">
                <thead>
                    <tr className="bg-primary">
                        <th colSpan="7" className="text-center">
                            <BtnInput title="<" classes="btn-outline-primary float-left text-white"/>
                            {
                                this.renderLabel("MMMM, YYYY", this.state.month)
                            }
                            <BtnInput title=">" classes="btn-outline-primary float-right text-white"/>
                        </th>
                    </tr>
                    <tr>
                        {
                            this.renderDaysOfWeek(this.state.month._locale._weekdays)
                        }
                    </tr>
                </thead>
            </table>
        )
    }
}

export default Calendar;