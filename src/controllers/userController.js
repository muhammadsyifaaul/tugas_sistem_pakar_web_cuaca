const { fetchData } = require('../api/getData');
const { getIp } = require('../api/getLocation');

const objCondition = {
    'Sunny': 'bx bxs-sun',
    'Clear': 'bx bxs-sun',
    'Partly Cloudy': 'bx bxs-cloud',
    'Partly cloudy': 'bx bxs-cloud',
    'Cloudy': 'bx bxs-cloud',
    'Patchy light rain': 'bx bxs-cloud-rain',
    'Overcast': 'bx bxs-sun',
    'Mist': 'bx bxs-sun',
    'Patchy rain possible': 'bx bxs-cloud-rain',
    'Light rain': 'bx bxs-cloud-rain',
    'Light rain shower': 'bx bxs-cloud-rain',
    'Patchy rain nearby': 'bx bxs-cloud-rain',
    'Moderate rain at times': 'bx bxs-cloud-rain',
    'Moderate rain': 'bx bxs-cloud-rain',
    'Heavy rain at times': 'bx bxs-cloud-rain',
    'Heavy rain': 'bx bxs-cloud-rain',
    'Moderate or heavy rain with thunder': 'bx bx-cloud-lightning',
    'Patchy light rain with thunder': 'bx bx-cloud-rain',
    'Thundery outbreaks possible': 'bx bxs-cloud-lightning',
    'Ice pellets': 'bx bx-cloud-snow'
}
const date = new Date()
const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const tgl = date.getDate()
const today = day[date.getDay()]; 
const month = months[date.getMonth()]; 
const year = date.getFullYear();



exports.homePage = async (req, res) => {
    try {
        const location =  await getIp();
        const data = await fetchData(location);
        const condition = data.current.condition.text
        for(let i in objCondition) {
            if(i === condition) {
                data.current.condition.icon = objCondition[i]
            }
        }
        res.render('main/index', { data , today, tgl , month , year });
        console.log(data)
        console.log(`Hari ini adalah ${today}, ${tgl}-${month}-${year}`);
    } catch (err) {
        console.log(err);
        res.render('main/index', { data: null });
    }
};
exports.search = async (req,res) => {
    const {location} = req.query
    const data = await fetchData(location)
    const condition = data.current.condition.text
        for(let i in objCondition) {
            if(i === condition) {
                data.current.condition.icon = objCondition[i]
            }
        }
    console.log(data)
    res.render('main/index', {data , today, tgl , month , year})
}