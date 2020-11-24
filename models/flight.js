const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema ({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DIA', 'LAX', 'SAN'],
    },
    arrival: Date,
}, {timestamps: true});

const flightSchema = new Schema ({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DIA', 'LAX', 'SAN'],
        default: 'DEN',
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            const today = new Date();
            return today.setFullYear(today.getFullYear()+1);
        },
    },
    destinations: [destinationSchema]
}, {timestamps: true});

module.exports = mongoose.model('Flight', flightSchema);