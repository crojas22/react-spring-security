import React from 'react';
import { FormRowCol } from "../reusable/DivReusables";
import { BtnInput, BtnSubmit } from "../reusable/Buttons";
import { axiosBodyAction, getUserContacts } from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMessageAction } from "../../actions/alert";
import Alert from "../reusable/Alert";

const ContactForm = ({toggleContactForm, axiosBodyAction, getUserContacts, getMessageAction}) => {
    let _firstName, _lastName , _company, _phone, _email;

    const handleSubmit = e => {
        e.preventDefault();
        axiosBodyAction({
            firstName: _firstName.value,
            lastName: _lastName.value,
            company: _company.value,
            email: _email.value,
            phoneNumber: _phone.value
        }, "newcontact", "post", getUserContacts);
        _firstName.value = "", _lastName.value = "", _company.value = "", _phone.value = "", _email.value = "";
        getMessageAction("Success!! Contact added", true, "success");
    };

    return(
        <div className="px-2">
            <Alert />
            <form className="contact-form" onSubmit={handleSubmit}>
                <h4>New Contact</h4>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text" id="firstName" ref={input => _firstName = input}
                               className="form-control" placeholder="First name" required />
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text" name="lastName" ref={input => _lastName = input}
                               className="form-control" placeholder="Last name" required />
                    </div>
                </div>
                <FormRowCol>
                    <input type="text" name="company" ref={input => _company = input}
                           className="form-control" placeholder="Company" required />
                </FormRowCol>
                <FormRowCol>
                    <input type="text" name="phone" ref={input => _phone = input}
                           className="form-control" placeholder="Phone number" required />
                </FormRowCol>
                <FormRowCol>
                    <input type="email" name="email" ref={input => _email = input}
                           className="form-control" placeholder="Email" />
                </FormRowCol>

                <BtnSubmit title="Save"
                           classes="btn-outline-primary mt-2 "/>

                <BtnInput classes="btn-outline-danger mt-2 ml-3"
                          title="Cancel" onClick={ toggleContactForm }/>
            </form>
        </div>
    )
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        axiosBodyAction,
        getMessageAction,
        getUserContacts
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(ContactForm);