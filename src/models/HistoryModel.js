const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    cuaca: {
        type: String,
        required: true
    },
    suhu: {
        type: String,
        required: true
    },
    kelembaban: {
        type: String,
        required: true
    },
    kecepatanAngin: {
        type: String,
        required: true
    },
    lamaPenyinaran: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const History = mongoose.model('history', historySchema)

module.exports = History