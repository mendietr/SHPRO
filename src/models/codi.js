const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodSchema = new Schema
({
    'co0': 'String',
    'co1': 'String',
    'co2': 'String'
});

module.exports = mongoose.model('codi', CodSchema);