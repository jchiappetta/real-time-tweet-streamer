import React, { createContext, useContext, useState } from 'react';

const AppState = createContext({});

const initialState = { 
    path: '', 
    title: '', 
    subHeader: '', 
    icon: '' 
};

export const AppContextProvider = (props) => {
    const [page, setPage] = useState(initialState);
    return (
        <AppState.Provider value={{ page, setPage }}>
            {props.children}
        </AppState.Provider>
    );
};

export const useAppContext = () => useContext(AppState);