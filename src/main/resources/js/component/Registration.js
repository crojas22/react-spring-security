import React from 'react';
import { JustifyContentCenter, FormRowCol } from "./reusable/DivReusables";
import { BtnSubmit } from "./reusable/Buttons";

const Registration = () => {
    return(
        <JustifyContentCenter>
            <form className="registration">
                <h4>Register</h4>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text" id="firstName"
                               className="form-control border-0" placeholder="First name" required />
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text" name="lastName"
                               className="form-control border-0" placeholder="Last name" required />
                    </div>
                </div>

                <FormRowCol>
                    <input type="text" name="email"
                           className="form-control border-0" placeholder="Email" required />
                </FormRowCol>

                <FormRowCol>
                    <input type="password" name="password"
                           className="form-control border-0" placeholder="New password" required />
                </FormRowCol>

                <BtnSubmit title='Register' classes='btn-primary' />
            </form>
        </JustifyContentCenter>
    )
};

export default Registration;