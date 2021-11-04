import React from 'react';

const Spinner = () => (
    <div style={{ padding: 12 }}>
        <div className="ui active centered large inline loader">
            <img
                className="ui image"
                src="/Twitter_Logo_Blue.png"
                alt="Twitter Logo"
            />
        </div>
    </div>
);

export default Spinner;