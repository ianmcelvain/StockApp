import React, { Component } from 'react';
import { Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import StockData from '../services/StockData';
import axios from'axios';
import moment from 'moment';
import Helper from '../services/Helper';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockInput: '',
            isLoading: false,
            formText: ''
        }

        this.helper = new Helper();
    }

    handleStockInput = (e) => {
        this.setState({ stockInput: e.target.value });
    }

    handleSubmit = (e) => {
        // Prevents HTML from refreshing page
        e.preventDefault();
        this.getData(this.state.stockInput, 'minute', 12);
        // Reset input field
        this.setState({ stockInput: '' });
    }

    async getData(name, time, limit) {
        this.setState({ isLoading:true })

        let dateFormat = 'LLLL';
        if(time === 'day') { dateFormat = 'dddd' }
        if(time === 'month') { dateFormat = 'MMMM' }
        if(time === 'annual') { dateFormat = 'MMMM' }
        
        let response;        
        try {
            const result = await axios.get('https://two-guys-with-computers.herokuapp.com' + `/stock/${name}/${time}/${limit}`);
            response = result.data;
            response.price = this.helper.shrinkArray(response.price, 12);
            response.time = this.helper.shrinkArray(response.time, 12);
            for (let index = 0; index < response.time.length; index++) {
                if(time === 'minute') { 
                    response.time[index] = moment(response.time[index]).fromNow(); 
                } else {
                    response.time[index] = moment(response.time[index]).format(dateFormat);
                }
            }
            this.setState({ isLoading: false });
            this.props.handleStockData(response);
            this.props.history.push('/dashboard');
        } catch (error) {
            this.setState({ formText: 'Incorrect stock symbol. Try again with caps.', isLoading: false });
        }
    }

    render() {
        return (
            <div className='App-header'>
                <h1 className='App-title'>Stock Search</h1>
                <Form onSubmit={this.handleSubmit} >
                    <InputGroup size="lg">
                    <FormControl 
                        value={this.state.stockInput} 
                        onChange={this.handleStockInput} 
                        placeholder='Symbols only...'
                        aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                    />
                    </InputGroup>
                </Form>
                <div className='mt-2'>
                    {this.state.isLoading ? <Spinner size='md' animation="border" /> : <span style={{color: 'red'}}><small>{this.state.formText}</small></span>}
                </div>
            </div>
        )
    }
}
