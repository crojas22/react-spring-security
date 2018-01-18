import React from "react";
import { SelectOptions } from "../reusable/SelectOptions";

const EditForm = ({selectOptions, inputRef, selectRef, submitHandle, placeHolderHandle, placeholder}) => {

    return(
        <form onSubmit={submitHandle}>
            <div className='input-group w-100 mb-2'>
                <SelectOptions options={selectOptions} selectOnChange={placeHolderHandle} selectRefVal={selectRef}/>
                <input type='text' name='_edit' className='form-control mx-0'
                       ref={inputRef} placeholder={placeholder} required/>
                <button type='submit' className="btn rounded-0 btn-outline-primary ml-2">
                    Save
                </button>
            </div>
        </form>
    )
};

export default EditForm;