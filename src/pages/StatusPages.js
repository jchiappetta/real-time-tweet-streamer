import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StatusItem from '../components/StatusItem';
import Loader from '../components/Loader';
import exchanges from '../constants/exchanges';

const style = { 
    display: 'flex', 
    flexDirection: 'column', 
    flexWrap: 'nowrap', 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignContent: 'center' 
};

const StatusPages = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [statusList, setStatusList] = useState([]);
    const [time, setTime] = useState(0);

    const refresh = () => { 
        window.location.reload();
    };

    useEffect(() => {
        let interval;
        if (interval !== 0) {
            const interval = setInterval(() => 
                setTime(interval), 
            1000);
            if (interval === 60000) {
                setTime(0);
                refresh();
            }
        }
        return () => {
            clearInterval(interval);
        };
    }, [time]);

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
        if (description === 'All Systems Operational') {
            return true;
        };
        return false;
    };

    useEffect(() => { 
        fetchStatusPages();
    }, []);

    const statusPagesList = () => (
        <div className="ui grid container">
            {statusList.map((sp) => (
                <StatusItem
                    name={sp?.page?.name}
                    description={sp?.status?.description}
                    updated_at={sp?.page?.updated_at}
                    url={sp?.page?.url}
                    color={checkStatus(sp?.status?.description) ? 'green' : 'red'}
                    icon={checkStatus(sp?.status?.description) ? 'check' : 'ban'}
                />
            ))}
        </div>
    );

    const refreshHeader = () => (
        <div class="ui one column grid">
            <div class="column">
                <div class="ui segment" style={style}>
                    <div className="ui header">
                        Page auto-refreshes every 5 minutes
                    </div>
                    <div class="ui vertical animated primary button" tabindex="0" onClick={() => refresh()}>
                        <div class="hidden content">Refresh</div>
                        <div class="visible content">
                            <i class="sync icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) return <Loader />;
    return (
        <div>
            {refreshHeader()}
            {statusPagesList()}
        </div>
    );
};

export default StatusPages;