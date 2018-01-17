import React from "react";
import { connect } from "react-redux";
import { getUserInfoAction } from "../actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import MdAdd from "react-icons/lib/md/add";
import MdRemove from "react-icons/lib/md/remove";
import { BtnInput } from "./reusable/Buttons";
import ContactForm from "./contact/ContactForm";
import AlphabeticalList from "./contact/AlphabeticalList";

class Contact extends React.Component {
    state = {
        addingContact: false
    };

    componentWillMount() {
        this.props.getUserInfoAction(this.props.history);
    }

    changeState = (name, target) => this.setState({ [ name ] : target });

    filterByLetter = letter => this.props.contacts.filter(each => each.name.slice(0,1).toUpperCase() === letter);

    renderAlphabetical = () => {
        const array = [];
        let counter = 65;
        while (counter < 91) {
            const contactsByLetter = this.filterByLetter(String.fromCharCode(counter));
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
        let { addingContact } = this.state;

        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="contact col-sm-10 col-md-9 col-lg-8 px-1 py-5">
                        <div>
                            <div className="col-auto">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <label htmlFor="search" className="input-group-text">@</label>
                                    </div>
                                    <input type="text" id="search" className="form-control" placeholder="Search"/>
                                </div>
                            </div>
                            <div className="mb-2">
                                <BtnInput title={addingContact ? <MdRemove size={24}/>:<MdAdd size={24}/>}
                                          classes={"btn-outline-" + (addingContact ? "danger":"primary")}
                                          onClick={() => this.changeState("addingContact", !addingContact)}/>
                            </div>
                            {
                                addingContact ? <ContactForm
                                    toggleContactForm={() => this.changeState("addingContact", !addingContact)}/> : null
                            }
                            <div>
                                <ul className="list-group py-3">
                                    {
                                        this.renderAlphabetical()
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