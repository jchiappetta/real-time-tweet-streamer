import React, { useEffect, useReducer } from 'react';
import socketIOClient from 'socket.io-client';
import Tweet from '../components/Tweet';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import { usePathname } from '../hooks/usePathname'; 
import { useAppContext } from '../contexts/AppContext';
import twitterLogo from '../images/Twitter_Logo_Blue.png';

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_tweet':
            return {
                ...state,
                tweets: [action.payload, ...state.tweets],
                error: null,
                isWaiting: false,
                errors: [],
            };
        case 'show_error':
            return { ...state, error: action.payload, isWaiting: false };
        case 'add_errors':
            return { ...state, errors: action.payload, isWaiting: false };
        case 'update_waiting':
            return { ...state, error: null, isWaiting: true };
        default:
            return state;
    }
};

const TweetFeed = () => {
    const { setPage } = useAppContext();
    const location = usePathname();

    useEffect(() => {
        if (location === '/tweets') {
            setPage({
                path: location,
                title: "Real Time Tweet Streamer",
                subHeader: "Powered by Twitter data",
                icon: twitterLogo
            });
        }
        // eslint-disable-next-line 
    }, []);

    const initialState = {
        tweets: [],
        error: {},
        isWaiting: true,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { tweets, error, isWaiting } = state;

    const streamTweets = () => {
        let socket;

        if (process.env.NODE_ENV === 'development') {
            socket = socketIOClient('http://localhost:3001/');
        } else {
            socket = socketIOClient('/');
        }

        socket.on('connect', () => {});
        socket.on('tweet', (json) => {
            if (json.data) {
                dispatch({ type: 'add_tweet', payload: json });
            }
        });
        socket.on('heartbeat', (data) => {
            dispatch({ type: 'update_waiting' });
        });
        socket.on('error', (data) => {
            dispatch({ type: 'show_error', payload: data });
        });
        socket.on('authError', (data) => {
            console.log('data =>', data);
            dispatch({ type: 'add_errors', payload: [data] });
        });
    };

    const reconnectMessage = () => {
        const message = {
            title: 'Reconnecting',
            detail: 'Please wait while we reconnect to the stream.',
        };

        if (error && error.detail) {
            return (
                <div>
                    <ErrorMessage
                        key={error.title}
                        error={error}
                        styleType="warning"
                    />
                    <ErrorMessage
                        key={message.title}
                        error={message}
                        styleType="success"
                    />
                    <Spinner />
                </div>
            );
        }
    };

    const errorMessage = () => {
        const { errors } = state;

        if (errors && errors.length > 0) {
            return errors.map((error) => (
                <ErrorMessage
                    key={error.title}
                    error={error}
                    styleType="negative"
                />
            ));
        }
    };

    const waitingMessage = () => {
        const message = {
            title: 'Still working',
            detail: 'Waiting for new Tweets to be posted',
        };

        if (isWaiting) {
            return (
                <>
                    <div>
                        <ErrorMessage
                            key={message.title}
                            error={message}
                            styleType="success"
                        />
                    </div>
                    <Spinner />
                </>
            );
        }
    };

    useEffect(() => {
        streamTweets();
    }, []);

    const showTweets = () => {
        if (tweets.length > 0) {
            return (
                <>
                    {tweets.map((tweet) => (
                        <Tweet key={tweet.data.id} json={tweet} />
                    ))}
                </>
            );
        }
    };

    return (
        <div>
            {reconnectMessage()}
            {errorMessage()}
            {waitingMessage()}
            {showTweets()}
        </div>
    );
};

export default TweetFeed;
