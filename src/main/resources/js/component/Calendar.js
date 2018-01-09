import React from 'react';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Week from "./calendar/Week";
import EventsForm from "./calendar/EventsForm";
import { JustifyContentCenter } from "./reusable/DivReusables";
import { getUserInfoAction } from "../actions";
import { BtnInput } from "./reusable/Buttons";

class Calendar extends React.Component {
    state = {
        month : moment(),
        select: moment(),
        addingEvent: false,
        showEvents: false,
    };

    componentWillMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    selectDayFunc = day => this.setState({ select: day.date});

    renderLabel = (format, month) => <span className='py-4 d-inline-block text-white'>{month.format(format)}</span>;

    renderDaysOfWeek = array => array.map(day => <th className="text-center" key={day}>{day.slice(0,3)}</th>);

    // General function to change state
    changeState = (name, target) => this.setState({ [ name ] : target });

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

        let { month, addingEvent, showEvents, select } = this.state;

        return(
            <JustifyContentCenter>
                <div className="table-responsive-sm">
                    <table className="calendar table">
                        <thead>
                        <tr className="bg-primary">
                            <th colSpan="7" className="text-center">
                                {/* back a month */}
                                <BtnInput title="<" onClick={() => this.changeState("month", month.add(-1, "month"))}
                                          classes="btn-outline-primary float-left text-white"/>

                                {
                                    this.renderLabel("MMMM, YYYY", month)
                                }
                                {/* forward a mont */}
                                <BtnInput title=">" onClick={() => this.changeState("month", month.add(1, "month"))}
                                          classes="btn-outline-primary float-right text-white"/>
                            </th>
                        </tr>
                        <tr>
                            <td colSpan="7" className="border border-white pl-0">
                                <BtnInput title={this.state.addingEvent? "-":"+"} classes='btn-outline-primary'
                                          onClick={() => this.changeState("addingEvent", !addingEvent)}/>
                                <BtnInput title="Events" classes='btn-outline-primary mx-2'
                                          onClick={() => this.changeState("showEvents", !showEvents)}/>
                            </td>
                        </tr>
                        {
                            addingEvent ?
                                <EventsForm addingEventToggle={() => this.changeState("addingEvent", !addingEvent)}
                                            selected={select}/>
                                : null
                        }
                        <tr>
                            {
                                this.renderDaysOfWeek(month._locale._weekdays)
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
            </JustifyContentCenter>
        )
    }
}

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUserInfoAction
    }, dispatch)
};

export default withRouter(connect(null, mapDispatchToProps)(Calendar));