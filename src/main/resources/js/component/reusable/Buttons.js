import React from 'react'

export const BtnInput = ({title, classes, onClick, type}) => (
    <input type={type} value={title} className={'btn rounded-0 ' + classes} onClick={onClick}/>
);
BtnInput.defaultProps = {
    type: 'button'
};

export const BtnSubmit = ({title, classes}) => (
    <button type='submit' className={'btn rounded-0 ' + classes}>
        {title}
    </button>
);