import React from 'react';

const style = { 
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'nowrap', 
    alignContent: 'center', 
    justifyContent: 'center', 
    alignItems:'center', 
    padding: 4 
};

const StatusItem = ({ name, description, updated_at, url, color, icon }) => (
    <div className="ui four wide column">
        <div className="ui list">
            <h4>{name}</h4>
            <div className="item" style={style}>
                <i className={`large ${color} middle aligned ${icon} icon`}></i>
                <div className="content">
                    <div className={`ui label ${color}`}>
                        {description}
                    </div>
                </div>
            </div>
            <div className="item" style={style}>
                <i className="large middle aligned calendar alternate outline icon"></i>
                <div className="content">
                    {new Date(updated_at).toUTCString()}
                </div>
            </div>
            <div className="item" style={style}>
                <i className="large blue middle aligned info circle icon"></i>
                <a className="content" href={url || '#'} target="_blank" rel="noopener noreferrer">
                    More Info
                </a>
            </div>
        </div>
    </div>
);

export default StatusItem;