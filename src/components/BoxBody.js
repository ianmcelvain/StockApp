import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoxBody = props => {

    return (
        <div className='box box-body'>
            <div className='box-title'>
                <h3>{props.title}</h3>
                <Dropdown style={{ flex:1, textAlign:'right' }}>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        <FontAwesomeIcon icon='calendar-alt' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => props.handleStockTime('minute')} >Minute</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.handleStockTime('day')} >Day</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.handleStockTime('month')} >Month</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='box-content'>
                {props.children}
            </div>
        </div>
    );

}

export default BoxBody
