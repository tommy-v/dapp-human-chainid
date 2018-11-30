import React from 'react';

const Input = (props) => {
    
    return (
        <div>
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <br/>
            <input 
                className="from-control"
                id={props.name}
                name={props.name}
                type={props.inputType}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default Input;