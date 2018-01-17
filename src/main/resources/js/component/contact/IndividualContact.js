import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MdAccountCircle from "react-icons/lib/md/account-circle";
import { BtnInput } from "../reusable/Buttons";
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import FaChevronUp from "react-icons/lib/fa/chevron-up";
import FaPhoneSquare from "react-icons/lib/fa/phone-square";
import FaEnvelope from "react-icons/lib/fa/envelope";
import MdBusiness from "react-icons/lib/md/business";
import MdClose from "react-icons/lib/md/close";
import MdEdit from "react-icons/lib/md/edit";
import MdStar from "react-icons/lib/md/star";
import MdStarOutline from "react-icons/lib/md/star-outline";
import { axiosBodyAction, axiosPathAction, getUserContacts } from "../../actions";

class IndividualContact extends React.Component {
    state = {
        isActive: false,
        isEditing: false
    };

    changeState = (name, target) => this.setState({ [ name ] : target });

    render() {
        return(
            <div>
                <div className="pt-3">
                    <MdAccountCircle size={28}/>
                    <p className="my-0 mx-3 d-inline-block">
                        {
                            `${this.props.firstName} ${this.props.lastName}`
                        }
                    </p>
                    <BtnInput onClick={() => this.changeState("isActive", !this.state.isActive)}
                              title={this.state.isActive ? <FaChevronUp size={16}/> : <FaChevronDown size={16}/>}
                              classes={"pt-0 bg-clear border-0 btn-block blb"}/>
                </div>
                <div className={"" + (this.state.isActive ? "bg-light py-3" : "collapse")}>
                    <div>
                        <div className="rounded-circle mx-auto">
                            {
                                this.props.firstName.slice(0,1).toUpperCase()
                            }
                        </div>
                        <div className="d-flex flex-wrap flex-lg-nowrap my-4">
                            <div className="btn-block text-center py-1">
                                <MdBusiness size={24}/>
                                {
                                    this.props.company
                                }
                            </div>
                            <div className="btn-block text-center m-0 py-1">
                                <FaPhoneSquare size={24}/>
                                {
                                    this.props.phoneNumber
                                }
                            </div>
                            <div className="btn-block text-center m-0 py-1 flex-">
                                <FaEnvelope size={24}/>
                                {
                                    this.props.email
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <BtnInput title={<MdEdit size={20}/>} classes="btn-primary border-0 btn-block"
                                  onClick={() => this.changeState("isEditing", !this.state.isEditing)}/>

                        <BtnInput title={this.props.favorite ? <MdStar size={20}/> : <MdStarOutline size={20}/>}
                                  classes="btn-primary border-0 btn-block m-0" onClick={() => this.props.axiosPathAction(
                            `complete/contact/${this.props.id}`, "patch", getUserContacts
                        )}/>

                        <BtnInput title={<MdClose size={20}/>} classes="btn-danger border-0 btn-block m-0"
                                  onClick={() => this.props.axiosPathAction(
                                      `delete/contact/${this.props.id}`, "delete", getUserContacts
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
        getUserContacts
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(IndividualContact);