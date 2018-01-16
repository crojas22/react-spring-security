import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { BtnInput, BtnSubmit } from "../reusable/Buttons";
import { axiosBodyAction } from "../../actions";
import Alert from "../reusable/Alert";
import { getMessageAction } from "../../actions/alert";

const EventsForm = ({addingEventToggle, selected, axiosBodyAction, events, getMessageAction}) => {
    let _event, _start, _end;

    // Will return array of events as long as not within current events start time and end time
    const verifyTime = () => {
        let newEventStart = moment(_start.value, "H:mm"),
            newEventEnd = moment(_end.value, "H:mm");
        if (newEventStart > newEventEnd) return [];
        return events.filter(each => {
            let currentEventStart = moment(each.startTime, "H:mm"),
                currentEventEnd = moment(each.endTime, "H:mm");
            return !currentEventStart.isBetween(newEventStart, newEventEnd)
                && !currentEventEnd.isBetween(newEventStart, newEventEnd)
                && !newEventStart.isBetween(currentEventStart, currentEventEnd)
                && !newEventEnd.isBetween(currentEventStart, currentEventEnd);
        })

    };

    const handleSubmit = e => {
        e.preventDefault();
        if (verifyTime().length === events.length) {
            axiosBodyAction({
                text: _event.value,
                date: selected._d.toString().slice(4,15),
                startTime: _start.value,
                endTime: _end.value
            }, "create", "post");
            _event.value = "", _start.value = "", _end.value = "";
            getMessageAction("Success!! Event added", true, "success");
        } else {
            getMessageAction("Time slot taken or end time is before start time", true, "danger");
        }
    };

    return(
        <tr>
            <td colSpan="7">
                <Alert />
                <form onSubmit={ handleSubmit }>
                    <div>
                        <div className="py-2">
                            For: { selected.format("LLLL").slice(0, -9) }
                        </div>
                        <div className="form-group mb-0">
                            <label htmlFor="from">Start time</label>
                            <input type="time" id="from" className="border-0 m-2"
                                   ref={input => _start = input} required/>
                        </div>
                        <div className="form-group mb-0">
                            <label htmlFor="to">End time</label>
                            <input type="time" id="to" className="border-0 m-2"
                                   ref={input => _end = input} required/>
                        </div>
                    </div>
                    <div>
                        <input type="text" name="event" ref={input => _event = input} placeholder="Type event"
                               className="form-control w-75 mb-2" required/>
                    </div>
                    <BtnSubmit title="Save"
                               classes="btn-outline-primary mt-2 "/>

                    <BtnInput classes="btn-outline-danger mt-2 ml-3"
                              title="Cancel" onClick={ addingEventToggle }/>
                </form>
            </td>
        </tr>
    )
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        axiosBodyAction,
        getMessageAction
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(EventsForm);