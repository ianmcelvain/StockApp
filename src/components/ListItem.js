import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListItem = props => {
    return ( 
        <div className='list-item'>
            <div className='list-item-title'>
                <span>{props.title}</span>
            </div>
            <div className='list-item-btn'>
            <Button onClick={props.clickHandler} variant="danger" size="lg">
                <FontAwesomeIcon icon='times' />
            </Button>
            </div>
        </div>
    )
}

export default ListItem;
