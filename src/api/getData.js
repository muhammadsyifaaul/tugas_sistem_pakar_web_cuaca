const axios = require('axios')
const dotenv = require('dotenv').config()


exports.fetchData = async () => {
    try {
        const res = await axios.get(`${process.env.API_URL}${process.env.API_KEY}&q=semarang`);
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};