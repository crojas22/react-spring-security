import React from 'react'

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