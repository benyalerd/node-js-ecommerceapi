const mongoose = require('mongoose');
const Product = require('./Product');

const ProductSKU = mongoose.model('ProductSKU', new mongoose.Schema({
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
   skuName:String,
   option:String,
   fullPrice:{
        type:Number,
        min:0
   },
   stock:{
    type:Number,
    min:0
}
}));

module.exports.ProductSKU = ProductSKU;