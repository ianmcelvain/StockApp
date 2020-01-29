import React, { Component } from 'react';
import { Container, Row, Col, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import BoxProperty from '../components/BoxProperty';
import BoxBody from '../components/BoxBody';
import ChartLineComparison from '../components/ChartLineComparison';
import moment from 'moment';
import Helper from '../services/Helper';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockInput: props.stockData.symbol,
            compareChartData: props.stockData,
            chartTime: 'minute',
            errorText: ''
        }

        this.child = React.createRef();
        this.helper = new Helper();
    }

    componentDidMount() {
        console.log(this.props.stockData.name);
        if(typeof this.props.stockData.name == 'undefined') {
            this.props.history.push('/');
        }
    }

    handleStockInput = (e) => {
        this.setState({ stockInput: e.target.value });
    }

    handleSubmit = (e) => {
        // Prevents HTML from refreshing page
        e.preventDefault();
        this.getNewStockData(this.state.stockInput, 'minute');
        // Reset input field
        this.setState({ stockInput: '' });
    }

    handleStockTime = (time) => {
        this.setChartTime(time)
    }

    async getNewStockData(name,time) {
        this.setState({ isLoading: true });
        let response = await this.helper.getData(name,time);

        if(response != 'error') {
            this.props.handleStockData(response);
            this.setState({
                compareChartData: response,
                chartTime: time
            });
        } else {
            this.setState({
                errorText: 'Incorrect stock symbol. Try again with caps.'
            });
        }

        this.setState({ isLoading: false });
    }

    async setChartTime(time) {
        this.setState({ isLoading: true });
        this.child.current.removeAllComparedStock();
        let newTimeData = await this.helper.getData(this.props.stockData.symbol, time);
        this.setState({
            compareChartData: newTimeData,
            chartTime: time,
            isLoading: false
        });
    }

    render() {
        return (
            <div>
                <div className='dashboard-header'>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className='dashboard-header-content'>
                                    <Form onSubmit={this.handleSubmit} >
                                        <InputGroup size="lg">
                                        <FormControl 
                                            value={this.state.stockInput} 
                                            onChange={this.handleStockInput} 
                                            aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                                        />
                                        </InputGroup>
                                    </Form>
                                    <div className='mt-2'>
                                        {this.state.isLoading ? <Spinner size='md' animation="border" /> : <span style={{color: 'red'}}><small>{this.state.errorText}</small></span>}
                                    </div>
                                    <h1><strong>{this.props.stockData.name}</strong></h1>
                                    <div className='properties'>
                                        <BoxProperty title={this.props.stockData.currentPrice} subtitle={'PRICE'} />
                                        <BoxProperty title={this.props.stockData.high} subtitle={'HIGH'} />
                                        <BoxProperty title={this.props.stockData.low} subtitle={'LOW'} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className='chart-comparison'>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <BoxBody title={'Chart'} handleStockTime={this.handleStockTime} >
                                    <ChartLineComparison 
                                        onTimeChange={this.onTimeChange} 
                                        stockData={this.state.compareChartData} 
                                        chartTime={this.state.chartTime}
                                        ref={this.child}
                                    />
                                </BoxBody>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
