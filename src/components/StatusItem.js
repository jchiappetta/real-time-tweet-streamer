import React from 'react';
import { AiOutlineCheck, AiFillInfoCircle } from 'react-icons/ai';

// TODO : Add semantic styling and implement a failure check -> !All Systems Operational
const StatusItem = ({ name, description, url }) => (
    <div className="four wide column">
        <h4>{name}</h4>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <AiOutlineCheck color="green" size={16} />
            <p style={{ color: "green", paddingLeft: 6 }}>{description}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 6  }}>
            <AiFillInfoCircle color="#4183c4" size={22} style={{ paddingRight: 6 }} />
            <a href={url ||  "#"} target='_blank' rel="noopener noreferrer">More Info</a>
        </div>
    </div>
);

export default StatusItem;