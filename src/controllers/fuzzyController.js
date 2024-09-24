
function suhuKeanggotaan(suhu) {
    let dingin = Math.max(0, Math.min((27 - suhu) / (27 - 24), 1));
    let normal = Math.max(0, Math.min((suhu - 25) / (31 - 25), (34 - suhu) / (34 - 29)));
    let panas = Math.max(0, Math.min((suhu - 29) / (34 - 29), 1));
    return { dingin, normal, panas };
}


function kelembabanKeanggotaan(kelembaban) {
    let kering = Math.max(0, Math.min((80 - kelembaban) / (80 - 70), 1));
    let lembab = Math.max(0, Math.min((kelembaban - 75) / (90 - 75), (95 - kelembaban) / (95 - 85)));
    let basah = Math.max(0, Math.min((kelembaban - 85) / (95 - 85), 1));
    return { kering, lembab, basah };
}


function anginKeanggotaan(kecepatanAngin) {
    let pelan = Math.max(0, Math.min((4 - kecepatanAngin) / (4 - 0), 1));
    let sedang = Math.max(0, Math.min((kecepatanAngin - 2) / (8 - 2), (10 - kecepatanAngin) / (10 - 6)));
    let kencang = Math.max(0, Math.min((kecepatanAngin - 6) / (10 - 6), 1));
    return { pelan, sedang, kencang };
}


function penyinaranKeanggotaan(lamaPenyinaran) {
    let rendah = Math.max(0, Math.min((40 - lamaPenyinaran) / (40 - 0), 1));
    let sedang = Math.max(0, Math.min((lamaPenyinaran - 20) / (80 - 20), (100 - lamaPenyinaran) / (100 - 60)));
    let tinggi = Math.max(0, Math.min((lamaPenyinaran - 60) / (100 - 60), 1));
    return { rendah, sedang, tinggi };
}


function aturanFuzzy(suhu, kelembaban, kecepatanAngin, lamaPenyinaran) {
    let suhuFuzzy = suhuKeanggotaan(suhu);
    let kelembabanFuzzy = kelembabanKeanggotaan(kelembaban);
    let anginFuzzy = anginKeanggotaan(kecepatanAngin);
    let penyinaranFuzzy = penyinaranKeanggotaan(lamaPenyinaran);


    let hujanRingan = Math.min(suhuFuzzy.normal, kelembabanFuzzy.lembab, anginFuzzy.sedang, penyinaranFuzzy.rendah);
    let hujanSedang = Math.min(suhuFuzzy.panas, kelembabanFuzzy.basah, anginFuzzy.kencang, penyinaranFuzzy.sedang);
    let cerahBerawan = Math.min(suhuFuzzy.dingin, kelembabanFuzzy.kering, anginFuzzy.pelan, penyinaranFuzzy.tinggi);

    return { hujanRingan, hujanSedang, cerahBerawan };
}


function defuzzifikasi(hasil) {
    let { hujanRingan, hujanSedang, cerahBerawan } = hasil;

    let zNumerator = (hujanRingan * 10 + hujanSedang * 35 + cerahBerawan * 5);
    let zDenominator = (hujanRingan + hujanSedang + cerahBerawan);

    return zNumerator / (zDenominator || 1);
}

// Contoh penggunaan
// let suhu = 30; // Input suhu
// let kelembaban = 80; // Input kelembaban
// let kecepatanAngin = 5; // Input kecepatan angin
// let lamaPenyinaran = 50; // Input lama penyinaran

// let hasil = aturanFuzzy(suhu, kelembaban, kecepatanAngin, lamaPenyinaran);
// let prediksiCuaca = defuzzifikasi(hasil);

// console.log("Prediksi cuaca (nilai tegas):", prediksiCuaca);
module.exports = {
    suhuKeanggotaan,
    kelembabanKeanggotaan,
    anginKeanggotaan,
    penyinaranKeanggotaan,
    aturanFuzzy,
    defuzzifikasi
}
