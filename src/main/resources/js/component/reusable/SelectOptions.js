import React from 'react';

export const SelectOptions = ({options, selectOnChange, selectRefVal}) => {

    const renderOptions = options.map(each => <option value={each} key={each}>{each}</option>);

    return(
        <select onChange={selectOnChange} ref={selectRefVal} className="custom-select rounded-0">
            {
                renderOptions
            }
        </select>
    )
};