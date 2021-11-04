import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <div className="ui three item menu">
        <NavLink to="/tweets" className="item" target="_blank">
            New Tweets
        </NavLink>
        <NavLink to="/rules" className="item" target="_blank">
            Manage Rules
        </NavLink>
        <NavLink to="/status" className="item" target="_blank">
            Status Pages
        </NavLink>
    </div>
);

export default Navbar;