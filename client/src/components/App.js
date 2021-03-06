// rendering layer control (react router)

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const ContractNew = () => <h2>contractNew</h2>;



class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing}></Route>
                        <Route exact path="/contracts" component={Dashboard}></Route>
                        <Route exact path="/contracts/new" component={ContractNew}></Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    } 
};

export default connect(null, actions)(App);