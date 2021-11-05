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

    const checkStatus = (description) => {
        if (description !== 'All Systems Operational') {
            return true;
        };
        return false;
    };

    useEffect(() => { 
        fetchStatusPages();
    }, []);

    const statusPagesList = () =>
        statusList.map((sp) => (
            <StatusItem
                name={sp?.page?.name}
                description={sp?.status?.description}
                updated_at={sp?.page?.updated_at}
                url={sp?.page?.url}
                color={checkStatus(sp?.status?.description) ? "red" :"green"}
                icon={checkStatus(sp?.status?.description) ? "ban" : "check"}
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