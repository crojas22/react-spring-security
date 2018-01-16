import React from 'react'
import { Link } from "react-router-dom";

export const BtnInput = ({title, classes, onClick, type}) => (
    <button type={type} className={'btn rounded-0 ' + classes} onClick={onClick}>
        {
            title
        }
    </button>
);

BtnInput.defaultProps = {
    type: 'button'
};

export const BtnSubmit = ({title, classes}) => (
    <button type='submit' className={'btn rounded-0 ' + classes}>
        {title}
    </button>
);

export const BtnLink = ({title, classes, to}) => (
    <Link to={to} className={'btn rounded-0 ' + classes}>
        {title}
    </Link>
);