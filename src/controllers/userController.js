const { fetchData } = require('../api/getData')
exports.homePage = async (req, res) => {
    try {
        const data = await fetchData();
        res.render('main/index', { data });
        console.log(data)
    } catch (err) {
        console.log(err);
        res.render('main/index', { data: null });
    }
};
