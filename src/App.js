import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TweetFeed from './pages/TweetFeed';
import RuleList from './pages/RuleList';
import StatusPages from './pages/StatusPages';
import Header from './components/Header';

const App = () => (
    <div className="ui container">
        <Header />
        <div className="ui container">
            <Router>
                <Navbar />
                <Route exact path="/" component={StatusPages} />
                <Route exact path="/rules" component={RuleList} />
                <Route exact path="/tweets" component={TweetFeed} />
                <Route exact path="/status" component={StatusPages} />
            </Router>
        </div>
    </div>
);

export default App;