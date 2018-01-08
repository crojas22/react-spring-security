import React from 'react';
import {BtnInput} from "../reusable/Buttons";

const Logout = ({logOut, userInfo}) => {
    return(
        <div>
            <span className='mr-2 text-muted text-capitalize'>Hello, {userInfo.firstName}</span>
            <BtnInput onClick={logOut} title="Log out" classes="btn-warning btn-sm"/>
        </div>
    )
};

export default Logout;