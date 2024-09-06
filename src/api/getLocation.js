const { axios } = require("../../app")

exports.getIp = async () => {
    const res = await axios.get(`https://ipinfo.io/json?token=${process.env.LOCATION_KEY}`)
    return res.data.city
}