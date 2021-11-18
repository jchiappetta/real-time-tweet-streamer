import React from 'react';

const style = { 
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignContent: 'center', 
    justifyContent: 'center', 
    alignItems:'center', 
    padding: '8px',
};

const content = { 
    display: 'flex', 
    flexDirection: 'column', 
    flexWrap: 'nowrap', 
    justifyContent: 'space-evenly', 
    alignContent: 'flex-start', 
    padding: '16px', 
    gap: 12,
    width: '100%' 
};

const item = { 
    width: '100%', 
    display: 'flex', 
    alignItems: 'center',
    paddingRight: '4px' 
};

const font = { 
    width: '100%', 
    fontSize: 'medium' 
};

const StatusCard = ({ name, description, updated_at, url, color, icon }) => (
    <div className="column">
        <div className="ui raised card" style={{ contain: 'content' }}>
            <div
                className="ui attached center aligned header"
                style={{ padding: '6px', fontSize: 'large' }}
            >
                {name}
            </div>
            <div className="content" style={content}>
                <div style={item}>
                    <i
                        className={`big ${color} middle aligned ${icon} icon`}
                    ></i>
                    <div
                        className={`ui center aligned label ${color}`}
                        style={font}
                    >
                        {description}
                    </div>
                </div>
                <div style={item}>
                    <i className="ui big center aligned calendar alternate outline icon"></i>
                    <div className="ui center aligned label grey" style={font}>
                        {new Date(updated_at).toUTCString()}
                    </div>
                </div>
            </div>
            <div className="large ui attached button" style={style}>
                <a
                    href={url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2185d0', fontSize: 'large', textTransform: 'capitalize' }}
                >
                    <i className="middle aligned info circle icon"></i>
                    More Info
                </a>
            </div>
        </div>
    </div>
);

export default StatusCard;