import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TweetFeed from './pages/TweetFeed';
import RuleList from './pages/RuleList';
import StatusPages from './pages/StatusPages';

const App = () => {
    return (
        <div className="ui container">
            <div className="introduction"></div>

            <h1 className="ui header">
                <img
                    className="ui image"
                    src="/Twitter_Logo_Blue.png"
                    alt="Twitter Logo"
                />
                <div className="content">
                    Real Time Tweet Streamer
                    <div className="sub header">Powered by Twitter data</div>
                </div>
            </h1>

            <div className="ui container">
                <Router>
                    <Navbar />
                    <Route exact path="/" component={RuleList} />
                    <Route exact path="/rules" component={RuleList} />
                    <Route exact path="/tweets" component={TweetFeed} />
                    <Route exact path="/status" component={StatusPages} />
                </Router>
            </div>
        </div>
    );
};

export default App;