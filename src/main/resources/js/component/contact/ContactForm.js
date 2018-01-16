import React from 'react';
import { FormRowCol } from "../reusable/DivReusables";
import { BtnInput, BtnSubmit } from "../reusable/Buttons";

const ContactForm = ({toggleContactForm}) => {
    let _firstName, _lastName , _company, _phone, _email;
    return(
        <div>
            <form className="contact-form">
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
                    <input type="text" name="email" ref={input => _email = input}
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

export default ContactForm;