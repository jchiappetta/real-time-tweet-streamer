import React, { createContext, useContext, useState } from 'react';

const AppState = createContext({});

const initialState = { 
    path: '', 
    title: '', 
    subHeader: '', 
    icon: '' 
};

export const AppContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [statusList, setStatusList] = useState([]);
    const [time, setTime] = useState(0);
    const [page, setPage] = useState(initialState);

    const value = {
        isLoading, 
        setIsLoading,
        statusList, 
        setStatusList,
        time, 
        setTime,
        page, 
        setPage
    };

    return (
        <AppState.Provider value={value}>
            {props.children}
        </AppState.Provider>
    );
};

export const useAppContext = () => useContext(AppState);