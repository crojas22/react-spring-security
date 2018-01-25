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
import EditForm from "./EditForm";

class IndividualContact extends React.Component {
    state = {
        isActive: false,
        isEditing: false,
        placeholder: this.props.name
    };

    changeState = (name, target) => this.setState({ [ name ] : target });

    handleSubmit = (variable, e) => {
        e.preventDefault();
        this.props.axiosBodyAction({
            id: this.props.id,
            [ variable ]: this._edit.value
        }, "edit/contact", "patch", this.props.getUserContacts);
        this.setState({ isEditing: !this.state.isEditing });
    };

    // Necessary so selectValue can reset value when not rendering
    onClick = () => {
        this.changeState("isEditing", !this.state.isEditing);
        // Will reset to default value
        this.changeState("placeholder", this.props.name);
    };

    render() {
        const options = ["Name", "Phone", "Email", "Company"];

        return(
            <div>
                <div className="pt-3 px-2">
                    {
                        this.props.favorite ? <MdStar size={28} color={"gold"}/> : <MdAccountCircle size={28}/>
                    }
                    <p className="my-0 mx-3 d-inline-block">
                        {
                            this.props.name
                        }
                    </p>
                    <BtnInput onClick={() => this.changeState("isActive", !this.state.isActive)}
                              title={this.state.isActive ? <FaChevronUp size={16}/> : <FaChevronDown size={16}/>}
                              classes={"pt-0 bg-clear border-0 btn-block"}/>
                </div>
                <div className={"" + (this.state.isActive ? "bg-light pt-3" : "collapse")}>
                    <div>
                        <div className="rounded-circle mx-auto">
                            {
                                this.props.name.slice(0,1).toUpperCase()
                            }
                        </div>
                        <div className="d-flex flex-wrap flex-xl-nowrap my-4">
                            <div className="btn-block text-center py-1">
                                <MdBusiness size={24}/>
                                {
                                    this.props.company
                                }
                            </div>
                            <div className="btn-block text-center m-0 py-1">
                                <FaPhoneSquare size={24}/>
                                {
                                    this.props.phone
                                }
                            </div>
                            <div className="btn-block text-center m-0 py-1 truncate">
                                <FaEnvelope size={24}/>
                                {
                                    this.props.email
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isEditing ?
                            <EditForm selectOptions={options}
                            inputRef={input => this._edit = input} selectRef={input => this._select = input}
                            submitHandle={() => this.handleSubmit(this._select.value.toLocaleLowerCase(), event)}
                            placeHolderHandle={() => this.changeState("placeholder", this.props[this._select.value.toLocaleLowerCase()])}
                            placeholder={this.state.placeholder}/>
                            : null
                    }
                    <div className="d-flex">
                        <BtnInput title={this.state.isEditing ? "Cancel" : <MdEdit size={20}/>}
                                  classes="border-0 btn-block btn-secondary"
                                  onClick={this.onClick}/>

                        <BtnInput title={this.props.favorite ? <MdStar size={20}/> : <MdStarOutline size={20}/>}
                                  classes="btn-secondary border-0 btn-block m-0" onClick={() => this.props.axiosPathAction(
                            `favorite/${this.props.id}`, "patch", getUserContacts
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