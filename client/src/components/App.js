// rendering layer control (react router)

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const ContractNew = () => <h2>contractNew</h2>;
const Landing = () => <h2>Landing</h2>;


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing}></Route>
                    <Route exact path="/contracts" component={Dashboard}></Route>
                    <Route exact path="/contracts/new" component={ContractNew}></Route>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;