import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormControl, InputGroup, Spinner} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from './ListItem';
import axios from 'axios';
import Helper from '../services/Helper';

export default class ChartLineComparison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartReference: {},
            comparedStocks: [],
            stockInput: '',
            chartTime: props.chartTime,
            errorText: '',
            isLoading: false
        }

        this.helper = new Helper();
    }

    handleStockInput = (e) => {
        this.setState({ stockInput: e.target.value });
    }

    handleSubmit = (e) => {
        // Prevents HTML from refreshing page
        e.preventDefault();
        console.log(this.props.chartTime);
        this.addComparedStock(this.state.stockInput, this.props.chartTime);
        // Reset input field
        this.setState({ stockInput: '' });
    }

    async addComparedStock(name, time) {
        this.setState({ isLoading:true });

        let newData = await this.helper.getData(name, time);
        
        if(newData != 'error') {
            this.setState({
                comparedStocks: this.state.comparedStocks.concat(newData),
                errorText: ''
            });

            let newDatasetIndex = this.state.comparedStocks.length;
            let newDataset = {
                label:this.state.comparedStocks[newDatasetIndex-1].name,
                data:this.state.comparedStocks[newDatasetIndex-1].price,
                lineTension: 0,
                borderColor: "rgb(255, 99, 132)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                fill: false,
                borderDash: [5, 5],
                pointRadius: 5,
                pointHoverRadius: 10,
            }
            this.chartReference.chartInstance.config.data.datasets.push(newDataset);

            this.chartReference.chartInstance.update();
        } else {
            this.setState({
                errorText: 'Incorrect stock symbol. Try again with caps.'
            });
        }

        this.setState({ isLoading:false });
    }

    removeComparedStock(index) {
        let stock = this.state.comparedStocks;
        const removeComparedStockIndex = stock.slice(0, index).concat(stock.slice(index + 1, stock.length));
        this.setState({
            comparedStocks: removeComparedStockIndex
        });
        let dataset = this.chartReference.chartInstance.config.data.datasets;
        const removeChartDatasetIndex = dataset.slice(0, index+1).concat(dataset.slice(index + 2, dataset.length));
        this.chartReference.chartInstance.config.data.datasets = removeChartDatasetIndex;
        this.chartReference.chartInstance.update();
    }

    removeAllComparedStock() {
        this.setState({ comparedStocks: [] });
    }

    renderComparedStocks() {
        return this.state.comparedStocks.map((comparedStocks, index) => {
            return(
                <ListItem key={index}
                title={comparedStocks.name}
                index={index}
                clickHandler={() =>this.removeComparedStock(index)}
                />
            )
        });
    }

    render() {
        return (
            
            <Row>
                <Col md={3}>
                    <Form onSubmit={this.handleSubmit} >
                        <InputGroup size="sm">
                        <FormControl 
                            value={this.state.stockInput} 
                            onChange={this.handleStockInput} 
                            placeholder='Compare with other stock...'
                            aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                        />
                        </InputGroup>
                    </Form>
                    {this.state.isLoading ? <Spinner size='sm' animation="border" /> : <span style={{color: 'red'}}><small>{this.state.errorText}</small></span>}
                    {this.renderComparedStocks()}
                </Col>
                <Col md={9}>
                    <Line ref={(reference) => this.chartReference = reference }
                        height={300}
                        data={{
                            labels:this.props.stockData.time,
                            datasets: [
                                {
                                    label:this.props.stockData.name,
                                    data:this.props.stockData.price,
                                    lineTension: 0,
                                    borderColor: "rgb(255, 99, 132)",
                                    pointBackgroundColor: "rgb(255, 99, 132)",
                                    pointHitRadius: 50,
                                    pointBorderWidth: 2,
                                    fill: false,
                                    borderDash: [5, 5],
                                    pointRadius: 5,
                                    pointHoverRadius: 10,
                                }
                            ]
                        }}
                        options={{
                            responsive:true,
                            maintainAspectRatio:false,
                            title:{
                                display:false,
                                text:'Apple',
                                fontSize:25
                                },
                                legend:{
                                display:false,
                                position:'right'
                                },
                                tooltips: {
                                mode: 'index',
                                intersect: false,
                                },
                                hover: {
                                    mode: 'nearest',
                                    intersect: true
                                }
                        }}
                    />
                </Col>
            </Row>
        )
    }
}
