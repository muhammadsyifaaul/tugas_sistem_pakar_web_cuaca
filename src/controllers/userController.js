const { fetchData } = require('../api/getData');
const { getIp } = require('../api/getLocation');
exports.homePage = async (req, res) => {
    try {
        const data = await fetchData();
        const ip = await getIp()
        res.render('main/index', { data });
        console.log(data)
        console.log(ip)
    } catch (err) {
        console.log(err);
        res.render('main/index', { data: null });
    }
};
