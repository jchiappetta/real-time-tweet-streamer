import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <div className="ui three item menu">
        <NavLink to="/tweets" className="item" target="_self">
            New Tweets
        </NavLink>
        <NavLink to="/rules" className="item" target="_blank">
            Manage Rules
        </NavLink>
        <NavLink to="/status" className="item" target="_self">
            Status Pages
        </NavLink>
    </div>
);

export default Navbar;