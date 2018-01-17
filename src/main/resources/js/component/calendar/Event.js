import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from 'moment';
import {BtnInput, BtnSubmit} from "../reusable/Buttons";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import FaChevronUp from "react-icons/lib/fa/chevron-up";
import MdCheckBox from "react-icons/lib/md/check-box";
import MdCheckBoxOutlineBlank from "react-icons/lib/md/check-box-outline-blank";
import MdClose from "react-icons/lib/md/close";
import MdEdit from "react-icons/lib/md/edit";
import { axiosBodyAction, axiosPathAction, getUserEvents } from "../../actions";

class Event extends React.Component {
    state = {
        isActive: false,
        isEditing: false
    };

    changeState = (name, target) => this.setState({ [ name ] : target });

    handleSubmit = e => {
        e.preventDefault();
        // Function takes 4 parameters
        this.props.axiosBodyAction({
            id: this.props.id,
            text: this._edit.value
        }, "edit", "patch", this.props.getUserEvents);
        this.setState({ isEditing: !this.state.isEditing });
    };

    render() {
        return(
            <div>
                <small className='text-muted mr-3'>
                    start: { moment(this.props.startTime, "hh:mm").format("h:mm a") }
                </small>
                <small className="text-muted">
                    end: { moment(this.props.endTime, "hh:mm").format("h:mm a") }
                </small>
                {
                    this.state.isEditing ?
                        <form onSubmit={this.handleSubmit}>
                            <div className='input-group w-100'>
                                <input type='text' name='_edit' className='form-control mx-0'
                                       ref={input => this._edit = input} required/>
                                <BtnSubmit title='Save' classes='btn-outline-primary'/>
                            </div>
                        </form>
                        :
                        <p className={"m-0 " + (this.props.complete ? "completed" : "")}>
                            { this.props.text }
                        </p>
                }

                <BtnInput onClick={() => this.changeState("isActive", !this.state.isActive)}
                          title={this.state.isActive ? <FaChevronUp size={16}/> : <FaChevronDown size={16}/>}
                          classes={"pt-0 bg-clear border-0 btn-block"}/>
                <div className={"" + (this.state.isActive ? "" : "collapse")}>
                    <div className="d-flex">
                        <BtnInput title={<MdEdit size={20}/>} classes="btn-primary border-0 btn-block"
                                  onClick={() => this.changeState("isEditing", !this.state.isEditing)}/>

                        <BtnInput title={this.props.complete ? <MdCheckBox size={20}/> : <MdCheckBoxOutlineBlank size={20}/>}
                                  classes="btn-primary border-0 btn-block m-0" onClick={() => this.props.axiosPathAction(
                            `complete/event/${this.props.id}`, "patch", getUserEvents
                        )}/>

                        <BtnInput title={<MdClose size={20}/>} classes="btn-danger border-0 btn-block m-0"
                                  onClick={() => this.props.axiosPathAction(
                                      `delete/event/${this.props.id}`, "delete", getUserEvents
                                  )}/>
                    </div>
                </div>
            </div>
        )
    }
}

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        axiosPathAction,
        axiosBodyAction,
        getUserEvents
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(Event);