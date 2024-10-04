// Fungsi untuk menghitung keanggotaan suhu
function suhuKeanggotaan(suhu) {
    let dingin = Math.max(0, Math.min((27 - suhu) / (27 - 24), 1));
    let normal = Math.max(
      0,
      Math.min((suhu - 25) / (31 - 25), (34 - suhu) / (34 - 29))
    );
    let panas = Math.max(0, Math.min((suhu - 29) / (34 - 29), 1));
    console.log(
      `Suhu: ${suhu}, Dingin: ${dingin}, Normal: ${normal}, Panas: ${panas}`
    );
    return { dingin, normal, panas };
  }

  function kelembabanKeanggotaan(kelembaban) {
    let kering = Math.max(0, Math.min((80 - kelembaban) / (80 - 70), 1));
    let lembab = Math.max(
      0,
      Math.min((kelembaban - 75) / (90 - 75), (95 - kelembaban) / (95 - 85))
    );
    let basah = Math.max(0, Math.min((kelembaban - 85) / (95 - 85), 1));
    console.log(
      `Kelembaban: ${kelembaban}, Kering: ${kering}, Lembab: ${lembab}, Basah: ${basah}`
    );
    return { kering, lembab, basah };
  }
  
  function anginKeanggotaan(kecepatanAngin) {
    let pelan = Math.max(0, Math.min((4 - kecepatanAngin) / (4 - 0), 1));
    let sedang = Math.max(
      0,
      Math.min((kecepatanAngin - 2) / (8 - 2), (10 - kecepatanAngin) / (10 - 6))
    );
    let kencang = Math.max(0, Math.min((kecepatanAngin - 6) / (10 - 6), 1));
    console.log(
      `Kecepatan Angin: ${kecepatanAngin}, Pelan: ${pelan}, Sedang: ${sedang}, Kencang: ${kencang}`
    );
    return { pelan, sedang, kencang };
  }
  
  function penyinaranKeanggotaan(lamaPenyinaran) {
    let rendah = Math.max(0, Math.min((80 - lamaPenyinaran) / (80 - 0), 1));
    let sedang = Math.max(
      0,
      Math.min(
        (lamaPenyinaran - 30) / (70 - 30),
        (100 - lamaPenyinaran) / (100 - 60)
      )
    );
    let tinggi = Math.max(0, Math.min((lamaPenyinaran - 60) / (100 - 60), 1));
    console.log(
      `Penyinaran: ${lamaPenyinaran}, Rendah: ${rendah}, Sedang: ${sedang}, Tinggi: ${tinggi}`
    );
    return { rendah, sedang, tinggi };
  }
  
  function aturanFuzzy(suhu, kelembaban, kecepatanAngin, lamaPenyinaran) {
    let suhuFuzzy = suhuKeanggotaan(suhu);
    let kelembabanFuzzy = kelembabanKeanggotaan(kelembaban);
    let anginFuzzy = anginKeanggotaan(kecepatanAngin);
    let penyinaranFuzzy = penyinaranKeanggotaan(lamaPenyinaran);
  
    // Aturan fuzzy
    let hujanRingan = Math.max(
      0,
      Math.min(
        suhuFuzzy.normal,
        kelembabanFuzzy.lembab,
        anginFuzzy.pelan,
        penyinaranFuzzy.rendah
      )
    );
    let hujanSedang = Math.max(
      0,
      Math.min(
        suhuFuzzy.panas,
        kelembabanFuzzy.basah,
        anginFuzzy.sedang,
        penyinaranFuzzy.sedang
      )
    );
    let cerahBerawan = Math.max(
      0,
      Math.min(
        suhuFuzzy.dingin,
        kelembabanFuzzy.kering,
        anginFuzzy.pelan,
        penyinaranFuzzy.tinggi
      )
    );
    let hujanLebat = Math.max(
      0,
      Math.min(
        suhuFuzzy.panas,
        kelembabanFuzzy.basah,
        anginFuzzy.kencang,
        penyinaranFuzzy.tinggi
      )
    );
  
    console.log(
      `Hujan Ringan: ${hujanRingan}, Hujan Sedang: ${hujanSedang}, Cerah Berawan: ${cerahBerawan}, Hujan Lebat: ${hujanLebat}`
    );
  
    return { hujanRingan, hujanSedang, cerahBerawan, hujanLebat };
  }
  function defuzzifikasi(hasil) {
    let { hujanRingan, hujanSedang, cerahBerawan, hujanLebat } = hasil;
  
    let zNumerator =
      hujanRingan * 10 + hujanSedang * 35 + cerahBerawan * 5 + hujanLebat * 100;
    let zDenominator = hujanRingan + hujanSedang + cerahBerawan + hujanLebat;
  
    console.log(`Z Numerator: ${zNumerator}, Z Denominator: ${zDenominator}`);
    return zNumerator / (zDenominator || 1); 
  }
  

  module.exports = {
    suhuKeanggotaan,
    kelembabanKeanggotaan,
    anginKeanggotaan,
    penyinaranKeanggotaan,
    aturanFuzzy,
    defuzzifikasi
  };
  