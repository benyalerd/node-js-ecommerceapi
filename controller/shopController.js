const express = require('express');
const router = express.Router();
const {Shop} = require('../model/Shop');
const {Merchant} = require('../model/Merchant');
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const {ShopValidation,emailValidation,telValidation} = require('../helper/validation/validation');
const {auth} = require('../middleware/auth');

const logger = winston.createLogger(logConfiguration);
router.post("/addshop",auth,async(req,res)=>{
    try
    {
const {error} = ShopValidation(req.body);
if(error)return res.status(400).send(error.details[0].message);
if(req.body.email != null && req.body.email != ""){
   const {error} = emailValidation({email:req.body.email});
   if(error)return res.status(400).send(error.details[0].message);
}
if(req.body.tel != null && req.body.tel != ""){
  const {error} = telValidation({email:req.body.tel});
  if(error)return res.status(400).send(error.details[0].message);
}
const merchant = await Merchant.find({_id:req.body.merchantId});
if(Object.keys(merchant).length = 0)return res.status(400).send("not found merchant");
let shop = new Shop({shopName:req.body.shopName,coverImg:req.body.coverImg,email:req.body.email,tel:req.body.tel,
address:req.body.address,isActive:true,isDelete:false,merchant:merchant._id});
shop = await shop.save();
return res.status(200).send(shop);
    }
    catch(err){
        logger.error(JSON.stringify(err.message));
        console.log(err);
        return res.status(500).send(err.message);
        
    }
});

router.get("/getshop",auth,async(req,res)=>{
    try
    {
const shop = await Shop.findOne({merchant:req.body.merchantId});
if(Object.keys(shop).length = 0)return res.status(400).send("not found shop");
return res.status(200).send(shop);
    }
    catch(err){
        logger.error(JSON.stringify(err.message));
        console.log(err);
        return res.status(500).send(err.message);
        
    }
});

router.post("/editshop",auth,async(req,res)=>{
    try
    {
let shop = await Shop.findOne({merchant:req.body.merchantId});
if(Object.keys(shop).length = 0)return res.status(400).send("not found shop");
if(req.body.shopName!= null && req.body.shopName!= "")
{
    shop.shopName = req.body.shopName;
}
if(req.body.coverImg!= null && req.body.coverImg!= "")
{
    shop.coverImg = req.body.coverImg;
}
if(req.body.email!= null && req.body.email!= "")
{
    shop.email = req.body.email;
}
if(req.body.tel!= null && req.body.tel!= "")
{
    shop.tel = req.body.tel;
}
if(req.body.address!= null && req.body.address!= "")
{
    shop.address = req.body.address;
}

shop = await shop.save();
return res.status(200).send(shop);
    }
    catch(err){
        logger.error(JSON.stringify(err.message));
        console.log(err);
        return res.status(500).send(err.message);
        
    }
});


module.exports = router