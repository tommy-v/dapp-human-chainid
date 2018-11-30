import React, { Component } from 'react';
import { AccountData, ContractForm } from 'drizzle-react-components';
import FormContainer from './form-container/FormContainer'
import logo from '../../logo.png';
//import hashString from './logic/hash-logic';
import web3 from 'web3';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                firstName: '',
                lastName: '',
                placeOfBirth: '',
                dateOfBirth: '',
                hash: null,
            }
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
        this.handleBirthPlace = this.handleBirthPlace.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
    }

    
    handleFirstName(firstName) {
        this.setState( prevState => ({
            newUser: {...prevState.newUser, firstName: firstName}
        }) )
    }

    handleLastName(lastName) {
        this.setState( prevState => ({
            newUser: {...prevState.newUser, lastName: lastName}
        }) )
    }

    handleBirthPlace(placeOfBirth) {
        this.setState( prevState => ({
            newUser: {...prevState.newUser, placeOfBirth: placeOfBirth}
        }) )
    }

    handleBirthDate(dateOfBirth) {
        this.setState( prevState => ({
            newUser: {...prevState.newUser, dateOfBirth: dateOfBirth}
        }) )
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let userData = this.state.newUser;
        //let hashHex = hashString(JSON.stringify(userData));
        let hashHex = web3.utils.asciiToHex(JSON.stringify(userData).substring(0, 32))
        this.setState( prevState => ({
            newUser: {...prevState.newUser, hash: hashHex}
        }));
        console.log(hashHex)        
    }

    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1 header">
                        <img src={logo} alt="drizzle-logo" />
                        <h1>HumanHashStorage</h1>
                    </div>

                    <div className="pure-u-1-1">
                        <h2>Your Account</h2>
                        <AccountData accountIndex="0" units="ether" precision="3" />
                    </div>

                    <div className="pure-u-1-1">
                        <h2>HashForm</h2>
                        <FormContainer
                            onFirstNameChange={this.handleFirstName}
                            onLastNameChange={this.handleLastName}
                            onBirthPlaceChange={this.handleBirthPlace}
                            onBirthDateChange={this.handleBirthDate}
                            onFormSubmitClicked={this.handleFormSubmit}
                        />
                    </div>

                    <div className="pure-u-1-1">
                        <h2>HumanHashStorage</h2>
                        <ContractForm contract="HumanHashesStorage" method="registerProfile" labels={['Your Human Hash']}/>
                        <br /><br />
                    </div>

                </div>
            </main>
        )
    }
}

export default Home
