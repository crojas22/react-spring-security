import React from 'react';
import { BtnInput, BtnSubmit } from "../reusable/Buttons";

const EventsForm = ({addingEventToggle, selected}) => {
    let _event, _start, _end;
    return(
        <tr>
            <td colSpan="7">
                <form>
                    <input type="text" name="event" ref={input => _event = input} placeholder="Add event"
                           className="form-control border-0 w-75 mb-2" required/>
                    <div>
                        <div className="py-2">
                            Date of event: { selected.slice(0, -9) }
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
                               classes="btn-outline-success mt-2 "/>

                    <BtnInput classes="btn-outline-danger mt-2 ml-3"
                              title="cancel" onClick={ addingEventToggle }/>
                </form>
            </td>
        </tr>
    )
};

export default EventsForm;