import React from 'react';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import FaMinus from "react-icons/lib/fa/minus";
import FaPlus from "react-icons/lib/fa/plus";
import GoThreeBars from "react-icons/lib/go/three-bars";
import GoX from "react-icons/lib/go/x";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JustifyContentCenter } from "./reusable/DivReusables";
import { getUserInfoAction } from "../actions";
import { BtnInput } from "./reusable/Buttons";
import Week from "./calendar/Week";
import EventsForm from "./calendar/EventsForm";
import EventList from "./calendar/EventList";

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
                <Week key={date.toString()} date={date.clone()} month={ this.state.month }
                      changeState={ this.changeState } selected={ this.state.select }
                      events={ this.props.userEvents }/>
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
                                          classes="btn-outline-primary float-left text-white arrow"/>

                                {
                                    this.renderLabel("MMMM, YYYY", month)
                                }
                                {/* forward a month */}
                                <BtnInput title=">" onClick={() => this.changeState("month", month.add(1, "month"))}
                                          classes="btn-outline-primary float-right text-white arrow"/>
                            </th>
                        </tr>
                        <tr>
                            <td colSpan="7" className="border border-white pl-0">
                                <BtnInput title={addingEvent?<FaMinus size={20}/>:<FaPlus size={20}/>}
                                          classes={"btn-outline-" + (addingEvent? "danger":"primary")}
                                          onClick={() => this.changeState("addingEvent", !addingEvent)}/>

                                <BtnInput title={showEvents?<GoX size={20}/>:<GoThreeBars size={20}/>}
                                          classes={"mx-2 btn-outline-" + (showEvents? "danger":"primary")}
                                          onClick={() => this.changeState("showEvents", !showEvents)}/>
                            </td>
                        </tr>
                        {
                            addingEvent ?
                                <EventsForm addingEventToggle={() => this.changeState("addingEvent", !addingEvent)}
                                            selected={select}/>
                                : null
                        }

                        {
                            showEvents ?
                                <EventList events={ this.props.userEvents } selected={select}/>
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

const mapStateToProps = state => {
    return {
        userEvents: state.userEvents
    }
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUserInfoAction
    }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Calendar));