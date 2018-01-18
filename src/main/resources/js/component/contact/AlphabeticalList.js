import React from "react";
import IndividualContact from "./IndividualContact";

const AlphabeticalList = ({letter, contacts}) => {

    const renderContacts = contacts.map(each => <li key={each.id} className="list-item bg-white shadow"><IndividualContact {...each}/></li>);

    return(
        <li className="list-item bg-white contact-list">
            <div className="bg-light-blue px-2 text-white">
                {
                    letter
                }
            </div>
            <ul className="list-group bg-white p-0">
                {
                    renderContacts
                }
            </ul>
        </li>
    )
};

export default AlphabeticalList;