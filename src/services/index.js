import axios from 'axios';

//https://rapidapi.com/coingecko/api/coingecko
export const fetchExchanges = async () => {
    try {
        const { data } = await axios.get(`https://coingecko.p.rapidapi.com/exchanges`, {
            headers: {
                'x-rapidapi-host': 'coingecko.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        }});
        return data;
    } catch (error) {
        console.log(error);
    }
};

//https://www.coingecko.com/en/api/documentation
export const fetchExchangesV3 = async (id) => {
    try {
        const exchangeId = id ? `${id}` : '';
        console.log(exchangeId);
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/exchanges/${exchangeId}`
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

//https://rapidapi.com/Coinranking/api/coinranking1/
export const fetchCoins = async () => {
    try {
        const response = await axios.get(`https://coinranking1.p.rapidapi.com/coins`, {
            headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        }});
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
