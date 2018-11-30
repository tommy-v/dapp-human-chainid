import React, { Component } from 'react';
import Input from './components/Input';
import Button from './components/Button';

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
        this.handleBirthPlace = this.handleBirthPlace.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
    }

     handleFirstName(event) {
         this.props.onFirstNameChange(event.target.value)
    }

    handleLastName(event) {
        this.props.onLastNameChange(event.target.value)
    }

    handleBirthPlace(event) {
        this.props.onBirthPlaceChange(event.target.value)
    }

    handleBirthDate(event) {
        this.props.onBirthDateChange(event.target.value)
    }

    handleFormSubmit(event) {
        this.props.onFormSubmitClicked(event)
    }

    render() {
        return (
            <form className="pure-form" onSubmit={this.handleFormSubmit}>
                <Input 
                    type={'text'} name={ 'firstName' } 
                    value={this.props.firstName} placeholder={'First Name'} handleChange={this.handleFirstName} /> 
                <Input
                    type={'text'} name={ 'lastName' } 
                    value={this.props.lastName} placeholder={'Last Name'} handleChange={this.handleLastName}/>
                <Input
                    type={'text'} name={ 'placeOfBirth' } 
                    value={this.props.placeOfBirth} placeholder={'Birth place'} handleChange={this.handleBirthPlace}/>
                <label htmlFor="dateOfBirth" className="form-label"></label>
                <input type="date" className="form-control" value={this.props.dateOfBirth} onChange={this.handleBirthDate}/>
                <br/>
                <Button title={'Submit'} onClick={this.props.handleFormSubmit}/>
            </form>
        )
    }
}

export default FormContainer;