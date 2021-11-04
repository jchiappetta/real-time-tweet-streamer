import axios from 'axios';
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line
const exchanges = [
    "bitstampltd",
    "bitfinex"
];

// TODO : Add all status page names -> map through them and output the data to the DOM
const StatusPages = () => {
    const [status, setStatus] = useState([]);

    const fetchStatus = async (name) => {
        try {
            const { data } = await axios.get(`https://${name}.statuspage.io/api/v2/status.json`);
            // console.log(data);
            setStatus(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { 
        fetchStatus("bitstampltd");
    }, []);

    return (
        <div className="container">
            <h4 className="header">Status Pages</h4>
            <div>
                <p>{status?.page?.name}</p>
                <p>{status?.status?.description}</p>
            </div>
        </div>
    );
};

export default StatusPages;