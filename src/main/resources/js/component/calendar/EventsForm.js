import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BtnInput, BtnSubmit } from "../reusable/Buttons";
import { createEventAction } from "../../actions";

const EventsForm = ({addingEventToggle, selected, createEventAction}) => {
    let _event, _start, _end;

    const handleSubmit = e => {
        e.preventDefault();
        createEventAction({
            text: _event.value,
            date: selected._d.toString().slice(4,15),
            startTime: _start.value,
            endTime: _end.value
        });
        _event.value = "", _start.value = "", _end.value = "";
    };

    return(
        <tr>
            <td colSpan="7">
                <form onSubmit={ handleSubmit }>
                    <input type="text" name="event" ref={input => _event = input} placeholder="Add event"
                           className="form-control border-0 w-75 mb-2" required/>
                    <div>
                        <div className="py-2">
                            Date of event: { selected.format("LLLL").slice(0, -9) }
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
        createEventAction
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(EventsForm);