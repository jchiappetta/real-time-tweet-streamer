import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import StatusPages from './pages/StatusPages';
import TweetFeed from './pages/TweetFeed';
import RuleList from './pages/RuleList';

const App = () => (
    <div className="ui container">
        <Header />
        <div className="ui container">
            <Router>
                <Navbar />
                <Switch>
                    <Redirect exact from="/" to="/status" />
                    <Route exact path="/status" component={StatusPages} />
                    <Route exact path="/tweets" component={TweetFeed} />
                    <Route exact path="/rules" component={RuleList} />
                </Switch>
            </Router>
        </div>
    </div>
);

export default App;