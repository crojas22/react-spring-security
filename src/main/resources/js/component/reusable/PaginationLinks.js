import React from "react";
import { BtnInput } from "./Buttons";

const PaginationLinks = ({perPage, pageNumber, arrayLength, changePage}) => {

    const totalPages = Math.ceil(arrayLength/perPage);

    const renderLinks = () => {
        let i = 0,
            array = [];

        for (i; i < totalPages; i++) {
            array.push(
                <li key={i}>
                    <BtnInput title={i + 1} onClick={e => changePage(e.target.innerHTML, totalPages)}
                              classes={"btn-" + (pageNumber === (i + 1) ? "primary" : "outline-primary")}/>
                </li>
            );
        }
        return array;
    };

    return(
        <nav>
            <ul className="pagination">
                <li>
                    <BtnInput title="<<" onClick={e => changePage(e.target.innerHTML, totalPages)}
                              classes="btn-outline-primary" />
                </li>
                {
                    renderLinks()
                }
                <li>
                    <BtnInput title=">>" onClick={e => changePage(e.target.innerHTML, totalPages)}
                              classes="btn-outline-primary"/>
                </li>
            </ul>
        </nav>
    )
};

export default PaginationLinks;