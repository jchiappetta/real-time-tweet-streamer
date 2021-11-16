import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Header = () => {
    const { page } = useAppContext();
    return (
        <>
            <div className="introduction"></div>
            <h1 className="ui header">
                <img
                    className="ui image"
                    src={page.icon}
                    alt="logo"
                />
                <div className="content">
                    {page.title}
                    <div className="sub header">{page.subHeader}</div>
                </div>
            </h1>
        </>
    );
};

export default Header;