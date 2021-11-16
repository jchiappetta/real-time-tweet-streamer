import React from 'react';
import twitterLogo from '../images/Twitter_Logo_Blue.png';

const Spinner = () => (
    <div style={{ padding: 12 }}>
        <div className="ui active centered large inline loader">
            <img
                className="ui image"
                src={twitterLogo}
                alt="logo"
            />
        </div>
    </div>
);

export default Spinner;