import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from 'moment';
import {BtnInput, BtnSubmit} from "../reusable/Buttons";
import GoTriangleDown from "react-icons/lib/go/triangle-down";
import GoTriangleUp from "react-icons/lib/go/triangle-up";
import MdCheckBox from "react-icons/lib/md/check-box";
import MdCheckBoxOutlineBlank from "react-icons/lib/md/check-box-outline-blank";
import MdClose from "react-icons/lib/md/close";
import MdEdit from "react-icons/lib/md/edit"
import {axiosBodyAction, axiosPathAction} from "../../actions";

class Event extends React.Component {
    state = {
        isActive: false,
        isEditing: false
    };

    changeState = (name, target) => this.setState({ [ name ] : target });

    handleSubmit = e => {
        e.preventDefault();
        this.props.axiosBodyAction({
            id: this.props.id,
            text: this._edit.value
        }, "edit", "patch");
        this.setState({ isEditing: !this.state.isEditing });
    };

    render() {
        return(
            <div>
                <BtnInput onClick={() => this.changeState("isActive", !this.state.isActive)}
                          title={this.state.isActive ? <GoTriangleUp size={16}/> : <GoTriangleDown size={16}/>}
                          classes={"pt-0 bg-clear border-0 btn-block"}/>
                <div className={"" + (this.state.isActive ? "" : "collapse")}>
                    <div className="d-flex">
                        <BtnInput title={<MdEdit size={20}/>} classes="btn-primary border-0 btn-block"
                                  onClick={() => this.changeState("isEditing", !this.state.isEditing)}/>

                        <BtnInput title={this.props.complete ? <MdCheckBox size={20}/> : <MdCheckBoxOutlineBlank size={20}/>}
                                  classes="btn-primary border-0 btn-block m-0" onClick={() => this.props.axiosPathAction(
                                      `complete/${this.props.id}`, "patch"
                                  )}/>

                        <BtnInput title={<MdClose size={20}/>} classes="btn-danger border-0 btn-block m-0"
                                  onClick={() => this.props.axiosPathAction(
                                      `delete/${this.props.id}`, "delete"
                                  )}/>
                    </div>
                </div>

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
            </div>
        )
    }
}

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        axiosPathAction,
        axiosBodyAction
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(Event);