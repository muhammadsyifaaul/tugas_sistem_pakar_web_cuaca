
const { axios } = require('../../app');
const { getIp } = require('./getLocation');

exports.fetchData = async (location) => {
    try {
        const res = await axios.get(`${process.env.API_URL}${process.env.API_KEY}&q=${location}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }

};