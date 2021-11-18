import axios from 'axios';
import React, { useEffect } from 'react';
import StatusItem from '../components/StatusItem';
import Loader from '../components/Loader';
import exchanges from '../constants/exchanges';
import { fetchCoins, fetchExchangesV3 } from '../services';
import { usePathname } from '../hooks/usePathname'; 
import { useAppContext } from '../contexts/AppContext';
import statusLogo from '../images/Status_Logo_Green.png';
import StatusCard from '../components/StatusCard';

const style = { 
    display: 'flex', 
    flexDirection: 'column', 
    flexWrap: 'nowrap', 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignContent: 'center' 
};

const StatusPages = () => {
    const {     
        isLoading, 
        setIsLoading,
        statusList, 
        setStatusList,
        time, 
        setTime,
        setPage 
    } = useAppContext();

    const location = usePathname();
    
    useEffect(() => {
        if (location === '/' || location === '/status') {
            setPage({
                path: location,
                title: 'Exchange Status Pages', 
                subHeader: 'Powered by Exchange data', 
                icon: statusLogo
            });
        }
        // eslint-disable-next-line 
    }, []);

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
            setTime(0);
            clearInterval(interval);
        };
        // eslint-disable-next-line
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

    // eslint-disable-next-line
    const fetchExchangesData = async (id) => {
        const data = await fetchExchangesV3(id);
        console.log(data);
        return data;
    };

    // eslint-disable-next-line
    const fetchCoinsData = async () => {
        const response = await fetchCoins();
        console.log(response);
        return response;
    }

    useEffect(() => {
        // fetchCoinsData();
        // fetchExchangesData(); // all 100 exchanges
        // fetchExchangesData('okcoin'); // by exchange ID
        fetchStatusPages();
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line
    const statusPagesCards = () => (
        <div className="ui four column grid container">
            {statusList.map((sp) => (
                <StatusCard
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

    // eslint-disable-next-line
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
        <div className="ui one column grid">
            <div className="column">
                <div className="ui segment" style={style}>
                    <div className="ui header">
                        Page auto-refreshes every 5 minutes
                    </div>
                    <div className="ui large vertical animated primary button" tabindex="0" onClick={() => refresh()}>
                        <div className="hidden content">Refresh</div>
                        <div className="visible content">
                            <i className="sync icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) return <Loader />;
    return (
        <div style={{ paddingBottom: '6vh' }}>
            {refreshHeader()}
            {statusPagesCards()}
        </div>
    );
};

export default StatusPages;