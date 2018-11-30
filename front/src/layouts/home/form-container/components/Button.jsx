import React from 'react';

const Button = (props) => {
    return(
        <button
            style={props.style}
            className="formButton pure-button"
            onClick={props.action}>
            {props.title}
        </button>
    )
}

export default Button;