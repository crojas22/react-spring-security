import React from 'react';
import moment from 'moment';
import {BtnInput} from "../reusable/Buttons";
import Week from "./Week";
import EventsForm from "./EventsForm";

class Calendar extends React.Component {
    state = {
        month : moment(),
        select: moment(),
        addingEvent: false
    };

    selectDayFunc = day => this.setState({ select: day.date});

    changeMonth = (int, keyword) => this.setState({ month: this.state.month.add(int, keyword)});

    renderLabel = (format, month) => <span className='py-4 d-inline-block text-white'>{month.format(format)}</span>;

    renderDaysOfWeek = array => array.map(day => <th className="text-center" key={day}>{day.slice(0,3)}</th>);

    addingEventHandle = () => this.setState({ addingEvent : !this.state.addingEvent });

    renderWeeks = () => {
        let weeks = [],
            done = false,
            date = this.state.month.clone().startOf("month").day("Sunday"),
            monthIndex = date.month(),
            count = 0;

        while (!done) {
            weeks.push(
                <Week key={date.toString()} date={date.clone()} month={this.state.month}
                      selectHandle={this.selectDayFunc} selected={this.state.select}/>
            );
            date.add(1, "w");
            // count++ > 2 will make sure if 1st week has last month and current month, loop wont stop on 1st week
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
        return weeks
    };

    render() {
        return(
            <div className="table-responsive-sm">
                <table className="calendar table">
                    <thead>
                    <tr className="bg-primary">
                        <th colSpan="7" className="text-center">
                            <BtnInput title="<" onClick={() => this.changeMonth(-1, "month")}
                                      classes="btn-outline-primary float-left text-white"/>

                            {
                                this.renderLabel("MMMM, YYYY", this.state.month)
                            }

                            <BtnInput title=">" onClick={() => this.changeMonth(1, "month")}
                                      classes="btn-outline-primary float-right text-white"/>
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="7" className="border border-white pl-0">
                            <BtnInput title={this.state.addingEvent? "-":"+"} classes='btn-outline-primary'
                                      onClick={ this.addingEventHandle }/>
                        </td>
                    </tr>
                    {
                        this.state.addingEvent ?
                            <EventsForm addingEventToggle={this.addingEventHandle}
                                        selected={this.state.select}/>
                            : null
                    }
                    <tr>
                        {
                            this.renderDaysOfWeek(this.state.month._locale._weekdays)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.renderWeeks()
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Calendar;