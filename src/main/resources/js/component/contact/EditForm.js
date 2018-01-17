import React from "react";

const EditForm = ({selectOptions, inputRef, selectRef, submitHandle}) => {
    const renderOptions = selectOptions.map(each => <option value={each} key={each}>{each}</option>);

    return(
        <form onSubmit={submitHandle}>
            <div className='input-group w-100 mb-2'>
                <select className="custom-select rounded-0" ref={selectRef} required>
                    {
                        renderOptions
                    }
                </select>
                <input type='text' name='_edit' className='form-control mx-0'
                       ref={inputRef} required/>
                <button type='submit' className="btn rounded-0 btn-outline-primary ml-2">
                    Save
                </button>
            </div>
        </form>
    )
};

export default EditForm;