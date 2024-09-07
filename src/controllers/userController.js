const { fetchData } = require('../api/getData');
const { getIp } = require('../api/getLocation');
exports.homePage = async (req, res) => {
    try {
        const location =  await getIp();
        const data = await fetchData(location);
        res.cookies('condition',`${data.current.condition.text}`)
        res.render('main/index', { data });
        console.log(data)
        console.log(ip)
    } catch (err) {
        console.log(err);
        res.render('main/index', { data: null });
    }
};
exports.search = async (req,res) => {
    const {location} = req.query
    const data = await fetchData(location)
    res.cookies('condition',`${data.current.condition.text}`)
    console.log(data)
    res.render('main/index', {data})
}