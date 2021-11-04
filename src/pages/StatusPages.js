import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineCheck, AiFillInfoCircle } from 'react-icons/ai'

// eslint-disable-next-line
const exchanges = [
    "bitstampltd",
    "bitfinex",
    "bitmex",
];

// TODO : Add all status page names -> map through them and output the data to the DOM
const StatusPages = () => {
    const [status, setStatus] = useState([]);

    const fetchStatus = async (name) => {
        try {
            const { data } = await axios.get(`https://${name}.statuspage.io/api/v2/status.json`);
            console.log(data);
            setStatus(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { 
        fetchStatus("bitmex");
    }, []);

    return (
        <div className="container">
            <div className="content">
                <h4>{status?.page?.name}</h4>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AiOutlineCheck color="green" size={16} />
                    <p style={{ color: "green", paddingLeft: 6 }}>{status?.status?.description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 6  }}>
                    <AiFillInfoCircle color="#4183c4" size={22} style={{ paddingRight: 6 }} />
                    <a href={status?.page?.url ||  "#"} target='_blank' rel="noopener noreferrer">More Info</a>
                </div>
            </div>
        </div>
    );
};

export default StatusPages;