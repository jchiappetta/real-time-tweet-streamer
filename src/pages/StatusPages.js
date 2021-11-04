import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StatusItem from '../components/StatusItem';
import Loader from '../components/Loader';
import exchanges from '../constants/exchanges';

const StatusPages = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [statusList, setStatusList] = useState([]);

    const fetchStatusPages = async () => {
        const promiseArray = exchanges.map((url) => axios.get(url));
        try {
            const statuses = (await Promise.all(promiseArray)).map(
                (res) => res.data
            );
            setStatusList(statuses);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { 
        fetchStatusPages();
    }, []);

    const statusPagesList = () =>
        statusList.map((sp) => (
            <StatusItem
                name={sp?.page?.name}
                description={sp?.status?.description}
                url={sp?.page?.url}
            />
        ));

    if (isLoading) return <Loader />;
    return (
        <div className="ui grid container">
            {statusPagesList()}
        </div>
    );
};

export default StatusPages;