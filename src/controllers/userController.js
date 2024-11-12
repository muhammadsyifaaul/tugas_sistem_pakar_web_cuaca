const { fetchData } = require('../api/getData')
const { getIp } = require('../api/getLocation')
const History = require('../models/HistoryModel')
const User = require('../models/UserModel')
const {
  suhuKeanggotaan,
  kelembabanKeanggotaan,
  anginKeanggotaan,
  penyinaranKeanggotaan,
  aturanFuzzy,
  defuzzifikasi
} = require('./fuzzyController')

const objCondition = {
  'Cerah Berawan': 'bx bxs-sun',
  "Hujan Ringan": 'bx bxs-cloud-rain',
  "Hujan Sedang": 'bx bxs-cloud-rain',
  "Hujan Deras" : 'bx bxs-cloud-rain'
}
const date = new Date()
const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

const tgl = date.getDate()
const today = day[date.getDay()]
const month = months[date.getMonth()]
const year = date.getFullYear()

exports.homePage = async (req, res) => {
  const suhu = req.session.suhu;
  const kelembaban = req.session.kelembaban;
  const kecepatanAngin = req.session.kecepatanAngin;
  const lamaPenyinaran = req.session.lamaPenyinaran;
  let prediksiCuaca = '';
  try {

    if (suhu === undefined || kelembaban === undefined || kecepatanAngin === undefined || lamaPenyinaran === undefined) {
      return res.status(400).send('Data cuaca tidak lengkap');
    }

    const suhuFuzzy = suhuKeanggotaan(suhu);
    const kelembabanFuzzy = kelembabanKeanggotaan(kelembaban);
    const anginFuzzy = anginKeanggotaan(kecepatanAngin);
    const penyinaranFuzzy = penyinaranKeanggotaan(lamaPenyinaran);

    const hasilFuzzy = aturanFuzzy(suhu, kelembaban, kecepatanAngin, lamaPenyinaran);
    // console.log(`Hasil fuzzy: ${JSON.stringify(hasilFuzzy)}`);

    const nilaiDefuzzifikasi = defuzzifikasi(hasilFuzzy);

    if (nilaiDefuzzifikasi <= 20) {
      prediksiCuaca = 'Cerah Berawan';
    } else if (nilaiDefuzzifikasi <= 50) {
      prediksiCuaca = 'Hujan Ringan';
    } else if (nilaiDefuzzifikasi <= 70) {
      prediksiCuaca = 'Hujan Sedang';
    } else {
      prediksiCuaca = 'Hujan Deras';
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan server');
  }

  let icon = '';
  const condition = prediksiCuaca;

  for (let i in objCondition) {
    if (i.toLowerCase().trim() === condition.toLowerCase().trim()) {
        icon = objCondition[i];
    }
}

  
  console.log(`Icon untuk ${prediksiCuaca}: ${icon}`);
  
  const data = {
    suhu,
    kelembaban,
    kecepatanAngin,
    lamaPenyinaran,
    prediksiCuaca,
    icon 
  };
  const history = new History({
    cuaca: prediksiCuaca,
    suhu,
    kelembaban,
    kecepatanAngin,
    lamaPenyinaran,
    user: req.session.userId
  })

  await history.save()

  res.render('main/index', {
      data,
      today,
      tgl,
      month,
      year
  });
}


// exports.search = async (req, res) => {
//   const { location } = req.query
//   const data = await fetchData(location)
//   const condition = data.current.condition.text
//   for (let i in objCondition) {
//     if (i === condition) {
//       data.current.condition.icon = objCondition[i]
//     }
//   }
//   console.log(data)
//   res.render('main/index', { data, today, tgl, month, year })
// }

exports.surveiPage = async (req, res) => {
  const getUser = await User.findOne({})
  res.render('main/survei', {
    getUser
  })
}

exports.olahDataCuaca = async (req, res) => {
  const { suhu, kelembaban, kecepatanAngin, lamaPenyinaran } = req.body
  req.session.suhu = suhu
  req.session.kelembaban = kelembaban
  req.session.kecepatanAngin = kecepatanAngin
  req.session.lamaPenyinaran = lamaPenyinaran

  res.redirect('/homePage')
}

exports.logout = async (req, res) => {
  req.session.destroy()
  res.clearCookie('connect.sid')
  res.redirect('/login')
}