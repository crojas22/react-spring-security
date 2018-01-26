import React from "react";
import { BtnSubmit } from "./Buttons";

const Form = props => {
    const renderInputs = () => {
        let inputs = [],
            arrayOfKeyProps = Object.keys(props),
            i = 0;

        for (i; i < props.numberOfInput; i++) {
            let nameOfProp = arrayOfKeyProps[i];
            inputs.push(
                <input key={nameOfProp} type={props.type[i]} ref={props[nameOfProp]}
                       className={props.classesInput} placeholder={nameOfProp} required/>
            )
        }
        return inputs;
    };

    return(
        <form className={props.classesForm}>
            {
                renderInputs()
            }
            <BtnSubmit title="Log in" classes="btn-primary " />
        </form>
    )
};

export default Form;
//
// <Form Email={input => this._email = input} Password={input => this._password = input}
//       numberOfInput={2} type={['text', 'password']}
//       classesInput="form-control form-control-sm mr-1" classesForm="form-inline"/>