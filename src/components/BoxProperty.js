import React from 'react';

const BoxProperty = props => {

    return (
        <div className='box box-property'>
            <h3>{props.title}</h3>
            <p>{props.subtitle}</p>
        </div>
    );

}

export default BoxProperty
