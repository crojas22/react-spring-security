import React from "react";
import { connect } from "react-redux";
import { getUserInfoAction } from "../actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import MdAdd from "react-icons/lib/md/add";
import MdRemove from "react-icons/lib/md/remove";
import MdSortByAlpha from "react-icons/lib/md/sort-by-alpha";
import MdStar from "react-icons/lib/md/star";
import MdStarOutline from "react-icons/lib/md/star-outline";
import { BtnInput } from "./reusable/Buttons";
import ContactForm from "./contact/ContactForm";
import AlphabeticalList from "./contact/AlphabeticalList";
import { SelectOptions } from "./reusable/SelectOptions";
import PaginationLinks from "./reusable/PaginationLinks";

class Contact extends React.Component {
    state = {
        addingContact: false,
        showingFavorite: false,
        filteringAlpha: false,
        selectedLetter: "",
        perPage: 4,
        pageNumber: 1
    };

    componentWillMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    changePageNumber = (value, totalLinks) => {
        if (!isNaN(value)) {
            this.setState({pageNumber: parseInt(value)});
        } else if (value === "&lt;&lt;" && this.state.pageNumber > 1) {
            this.setState({pageNumber: this.state.pageNumber - 1})
        } else if (value === "&gt;&gt;" && this.state.pageNumber < totalLinks) {
            this.setState({pageNumber: this.state.pageNumber + 1})
        }
    };

    filterByLetter = (array, letter) => array.filter(each => each.name.slice(0,1).toUpperCase() === letter);

    renderAlphabetical = (pageNumber, arrayVariable, perPage) => {
        let contacts = [],
            i = 65,
            max = pageNumber * perPage,
            min = max - perPage,
            sliced = arrayVariable.length < perPage ? arrayVariable : arrayVariable.slice(min, max);

        for (i; i < 91; i++) {
            const contactsByLetter = this.filterByLetter(sliced, String.fromCharCode(i));

            if(contactsByLetter.length > 0) {
                contacts.push(
                    <AlphabeticalList key={i} letter={String.fromCharCode(i)} contacts={contactsByLetter}/>
                );
            }
        }
        return contacts;
    };

    render() {
        let { addingContact, showingFavorite, filteringAlpha, pageNumber, perPage, selectedLetter } = this.state;

        const onlyFavoriteArray = this.props.contacts.filter(each => each.favorite),
            // Will return all contacts grouped by letters, useful for getting letters that have a contact
            contactsFilteredByLetter = this.renderAlphabetical(1, this.props.contacts, this.props.contacts.length),
            // Will return array with only contacts that start with selectedLetter
            byLetter = contactsFilteredByLetter.filter(each => each.props.letter === selectedLetter);

        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="contact col-sm-10 col-md-9 col-lg-8 px-1 pt-5 pb-3">
                        <div className="table-shadow">
                            <div className="col-auto bg-primary px-0">
                                <h1 className="text-center m-0 py-4 text-white font-weight-light">
                                    Contacts
                                </h1>
                            </div>
                            <div className="py-3 px-2">
                                <BtnInput title={addingContact ? <MdRemove size={24}/>:<MdAdd size={24}/>}
                                          classes={"btn-outline-" + (addingContact ? "danger":"primary")}
                                          onClick={() => this.setState({addingContact: !addingContact})}/>

                                <BtnInput title={showingFavorite ? <MdStar size={24}/> : <MdStarOutline size={24}/>}
                                          classes={"mx-2 btn-outline-" + (showingFavorite ? "danger":"primary")}
                                          disabled={filteringAlpha} onClick={() => this.setState({
                                              showingFavorite: !showingFavorite,
                                              pageNumber: 1
                                          })}/>

                                <BtnInput title={<MdSortByAlpha size={24}/>}
                                          classes={"btn-outline-" + (filteringAlpha ? "danger":"primary")}
                                          disabled={showingFavorite} onClick={() => this.setState({
                                              filteringAlpha: !filteringAlpha,
                                              pageNumber: 1,
                                              selectedLetter: "A"
                                          })}/>

                                <div className="float-right d-inline">
                                    {
                                        filteringAlpha ?
                                            <SelectOptions options={contactsFilteredByLetter.map((each) => each.props.letter)}
                                                           selectRefVal={input => this._letter = input}
                                                           selectOnChange={() => this.setState({selectedLetter: this._letter.value})}/>
                                            : null
                                    }
                                    <SelectOptions options={[4,8,12]} selectRefVal={input => this._select = input}
                                                   selectOnChange={() => this.setState({
                                                       perPage: parseInt(this._select.value),
                                                       pageNumber: 1
                                                   })}/>
                                </div>
                            </div>
                            {
                                addingContact ? <ContactForm
                                    toggleContactForm={() => this.setState({addingContact: !addingContact})}/> : null
                            }
                            <div>
                                <ul className="list-group">
                                    {/* Will pass different array to function depending on state, 3 options available */}
                                    {
                                        showingFavorite ? this.renderAlphabetical(pageNumber, onlyFavoriteArray, perPage) :
                                            filteringAlpha ? byLetter :
                                                this.renderAlphabetical(pageNumber, this.props.contacts, perPage)

                                    }
                                 </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {/* Will pass the length of contacts based on current array being rendered, 3 options availle */}
                    <PaginationLinks perPage={perPage} pageNumber={pageNumber}
                                     arrayLength={
                                         showingFavorite ? onlyFavoriteArray.length :
                                             filteringAlpha ? byLetter.length :
                                                 this.props.contacts.length
                                     } changePage={this.changePageNumber}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.userContacts
    }
};

const  mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUserInfoAction
    }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact));