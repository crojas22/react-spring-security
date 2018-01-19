import React from "react";
import { connect } from "react-redux";
import { getUserInfoAction } from "../actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import MdAdd from "react-icons/lib/md/add";
import MdRemove from "react-icons/lib/md/remove";
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
        perPage: 4,
        pageNumber: 1
    };

    componentWillMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    changeState = (name, target) => this.setState({ [ name ] : target });

    changePageNumber = (value, totalLinks) => {
        if (!isNaN(value)) {
            this.changeState("pageNumber", parseInt(value));
        } else if (value === "&lt;&lt;" && this.state.pageNumber > 1) {
            this.changeState("pageNumber", this.state.pageNumber - 1)
        } else if (value === "&gt;&gt;" && this.state.pageNumber < totalLinks) {
            this.changeState("pageNumber", this.state.pageNumber + 1)
        }
    };

    filterByLetter = (array, letter) => array.filter(each => each.name.slice(0,1).toUpperCase() === letter);

    renderAlphabetical = (pageNumber, arrayVariable, perPage) => {
        let array = [],
            i = 65,
            max = pageNumber * perPage,
            min = max - perPage;
        const sliced = arrayVariable.length < perPage ? arrayVariable : arrayVariable.slice(min, max);

        for (i; i < 91; i++) {
            const contactsByLetter = this.filterByLetter(sliced , String.fromCharCode(i));
            if (contactsByLetter.length > 0) {
                array.push(
                    <AlphabeticalList key={i} letter={String.fromCharCode(i)} contacts={contactsByLetter}/>
                );
            }
        }
        return array;
    };

    render() {
        let { addingContact, showingFavorite } = this.state;

        const onlyFavoriteArray = this.props.contacts.filter(each => each.favorite);

        const pagesPerPage = [4, 8, 12];

        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="contact col-sm-10 col-md-9 col-lg-8 px-1 pt-5 pb-3">
                        <div className="table-shadow">
                            <div className="col-auto bg-primary px-0">
                                <h1 className="text-center m-0 py-4 text-white">
                                    Contacts
                                </h1>
                            </div>
                            <div className="py-3 px-2">
                                <BtnInput title={addingContact ? <MdRemove size={24}/>:<MdAdd size={24}/>}
                                          classes={"btn-outline-" + (addingContact ? "danger":"primary")}
                                          onClick={() => this.changeState("addingContact", !addingContact)}/>

                                <BtnInput title={showingFavorite ? <MdStar size={24}/> : <MdStarOutline size={24}/>}
                                          classes={"mx-2 btn-outline-" + (showingFavorite ? "danger":"primary")}
                                          onClick={() => this.changeState("showingFavorite", !showingFavorite)}/>

                                <div className="float-right d-inline">
                                    <SelectOptions options={pagesPerPage} selectRefVal={input => this._select = input}
                                                   selectOnChange={() => this.changeState("perPage", parseInt(this._select.value))}/>
                                </div>
                            </div>
                            {
                                addingContact ? <ContactForm
                                    toggleContactForm={() => this.changeState("addingContact", !addingContact)}/> : null
                            }
                            <div>
                                <ul className="list-group">
                                    {/* Will pass different array to function depending on state */}
                                    {
                                        this.state.showingFavorite ?
                                            this.renderAlphabetical(this.state.pageNumber, onlyFavoriteArray, this.state.perPage)
                                            : this.renderAlphabetical(this.state.pageNumber, this.props.contacts, this.state.perPage)
                                    }
                                 </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {/* Will pass the length of all contacts or just favorites */}
                    <PaginationLinks perPage={this.state.perPage} pageNumber={this.state.pageNumber}
                                     arrayLength={this.state.showingFavorite ? onlyFavoriteArray.length
                                         : this.props.contacts.length} changePage={this.changePageNumber}/>
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