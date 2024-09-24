const { fetchData } = require('../api/getData');
const { getIp } = require('../api/getLocation');
const User = require('../models/UserModel');
const { suhuKeanggotaan, kelembabanKeanggotaan, anginKeanggotaan, penyinaranKeanggotaan, aturanFuzzy, defuzzifikasi } = require('./fuzzyController');


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



// exports.homePage = async (req, res) => {
//     try {
//         const location =  await getIp();
//         const data = await fetchData(location);
//         const condition = data.current.condition.text
//         console.log(req.session.suhu)
//         for(let i in objCondition) {
//             if(i === condition) {
//                 data.current.condition.icon = objCondition[i]
//             }
//         }
//         res.render('main/index', { data , today, tgl , month , year });
//         console.log(`Hari ini adalah ${today}, ${tgl}-${month}-${year}`);
//     } catch (err) {
//         console.log(err);
//         res.render('main/index', { data: null });
//     }
// };
exports.homePage = async (req, res) => {
    try {
        // Ambil data dari session
        const suhu = req.session.suhu;
        const kelembaban = req.session.kelembaban;
        const kecepatanAngin = req.session.kecepatanAngin;
        const lamaPenyinaran = req.session.lamaPenyinaran;

        // Pastikan semua variabel memiliki nilai yang valid
        if (!suhu || !kelembaban || !kecepatanAngin || !lamaPenyinaran) {
            return res.status(400).send('Data cuaca tidak lengkap');
        }

        // Gunakan fungsi keanggotaan untuk mengolah data
        const suhuFuzzy = suhuKeanggotaan(suhu);
        const kelembabanFuzzy = kelembabanKeanggotaan(kelembaban);
        const anginFuzzy = anginKeanggotaan(kecepatanAngin);
        const penyinaranFuzzy = penyinaranKeanggotaan(lamaPenyinaran);

        // Kombinasikan dengan aturan fuzzy
        const hasilFuzzy = aturanFuzzy(suhu, kelembaban, kecepatanAngin, lamaPenyinaran);

        // Lakukan defuzzifikasi
        const prediksiCuaca = defuzzifikasi(hasilFuzzy);

        // Periksa apakah prediksiCuaca memiliki nilai valid
        if (isNaN(prediksiCuaca)) {
            return res.status(500).send('Error dalam perhitungan cuaca');
        }

        // Kirim hasil ke view atau sebagai response
        res.send({ suhuFuzzy, kelembabanFuzzy, anginFuzzy, penyinaranFuzzy, prediksiCuaca });
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan server');
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

exports.surveiPage = async (req,res) => {
    const getUser = await User.findOne({})
    res.render('main/survei',{
        getUser
    })
}

exports.olahDataCuaca = async (req,res) => {

    const {suhu, kelembaban, kecepatanAngin, lamaPenyinaran} = req.body
    req.session.suhu = suhu
    req.session.kelembaban = kelembaban
    req.session.kecepatanAngin = kecepatanAngin
    req.session.lamaPenyinaran = lamaPenyinaran


    res.redirect('/homePage')
}