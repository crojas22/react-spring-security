import React from "react";
import { connect } from "react-redux";
import { getUserInfoAction } from "../actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import MdAdd from "react-icons/lib/md/add";
import MdRemove from "react-icons/lib/md/remove";
import MdSearch from "react-icons/lib/md/search";
import MdZoomOut from "react-icons/lib/md/zoom-out";
import MdStar from "react-icons/lib/md/star";
import MdStarOutline from "react-icons/lib/md/star-outline";
import { BtnInput } from "./reusable/Buttons";
import ContactForm from "./contact/ContactForm";
import AlphabeticalList from "./contact/AlphabeticalList";

class Contact extends React.Component {
    state = {
        addingContact: false,
        showingFavorite: false
    };

    componentWillMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    changeState = (name, target) => this.setState({ [ name ] : target });

    filterByLetter = (array, letter) => array.filter(each => each.name.slice(0,1).toUpperCase() === letter);

    renderAlphabetical = arrayVariable => {
        const array = [];
        let counter = 65;
        while (counter < 91) {
            const contactsByLetter = this.filterByLetter(arrayVariable , String.fromCharCode(counter));
            if (contactsByLetter.length > 0) {
                array.push(
                    <AlphabeticalList key={counter} letter={String.fromCharCode(counter)} contacts={contactsByLetter}/>
                );
                counter++;
                continue
            }
            counter++;
        }
        return array;
    };

    render() {
        let { addingContact, showingFavorite } = this.state;

        const onlyFavoriteArray = this.props.contacts.filter(each => each.favorite);

        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="contact col-sm-10 col-md-9 col-lg-8 px-1 py-5">
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
                            </div>
                            {
                                addingContact ? <ContactForm
                                    toggleContactForm={() => this.changeState("addingContact", !addingContact)}/> : null
                            }
                            <div>
                                <ul className="list-group">
                                    {/* Will pass different array to function depending on state */}
                                    {
                                        this.state.showingFavorite ? this.renderAlphabetical(onlyFavoriteArray)
                                            : this.renderAlphabetical(this.props.contacts)
                                    }
                                 </ul>
                            </div>
                        </div>
                    </div>
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