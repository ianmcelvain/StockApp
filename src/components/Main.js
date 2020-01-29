import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import moment from 'moment';
import Helper from '../services/Helper';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockData: {},
            isDataLoading: false,
            isAppLoading: false,
            appStatus: ''
        }

        this.helper = new Helper();
    }

    componentDidMount() {
        this.wakeUpApp();
    }

    async wakeUpApp() {
        this.setState({ isAppLoading: true })

        try {
            await this.helper.wakeUpApp();

        } catch(error) {

        }

        this.setState({ isAppLoading: false })
    }

    /*
    * Handler for retrieving stock data.
    * Gets passed down to the component that has the stock input
    * field and once sumbitted, the data will get passed back up
    * to our Main component.
    * 
    * This method lets up pass data back up the chain of components
    * so we can globalize the variable so all components can access
    * it.
    */
    handleStockData = (data) => {

        this.setState({
            stockData: data
        });
    }

    render() {
        return (
            <div className='App'>
                <Switch>
                    <Route 
                        exact path="/" 
                        render={props => (
                            <div>
                                <div className='app-status'>
                                    <h3>App Status: {this.state.isAppLoading ? 'Waking up...' : 'Awake'}</h3>
                                </div>
                                <Home {...props} handleStockData={this.handleStockData}  />
                            </div>
                        )}
                    />
                    <Route 
                        exact path="/dashboard" 
                        render={props => (
                            <Dashboard {...props} handleStockData={this.handleStockData} stockData={this.state.stockData} />
                        )}
                    />
                </Switch>
            </div>
        )
    }
}
