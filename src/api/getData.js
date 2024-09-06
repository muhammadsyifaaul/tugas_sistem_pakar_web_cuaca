
const { axios } = require('../../app');
const { getIp } = require('./getLocation');

exports.fetchData = async () => {
    try {
        const ip = await getIp();
        const res = await axios.get(`${process.env.API_URL}${process.env.API_KEY}&q=${ip}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
    
};