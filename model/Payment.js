const mongoose = require('mongoose');
const Shop = require('./Shop');
const Master = require('./Master');

const Payment = mongoose.model('Payment', new mongoose.Schema({
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    master :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    },
   accountName:String,
   accountNumber:String,
   createdDate:Date,
createdBy:String,
updatedDate:Date,
updatedBy:String
}));

module.exports.Payment = Payment;