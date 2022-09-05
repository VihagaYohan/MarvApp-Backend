const mongoose = require('mongoose');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi)

const orderSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        trim: true,
        required: [true, 'Please add name']
    },
    serviceProviderId: {
        type:mongoose.Types.ObjectId,
        trim: true,
        required: [true, 'Please add name']
    },
    serviceType:{
        type:mongoose.Types.ObjectId,
        trim:true,
        required:[true,'Please add service type']
    },
    orderStatus:{
        type:String,
        enum:['pending','completed','in-progress','assigned','cancelled'],
        trim:true,
        default:"pending"
    },
    date:{
        type:Date,
        required:[true,'Please add date']
    },
    startTime:{
        type:String,
        required:[true,'Please add start time']
    },
    totalFee:{
        type:mongoose.Types.Decimal128,
        required:[true,'Please add total service charge']
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

// create order model
const Order = mongoose.model('Order',orderSchema);

// order input validation
const validationOrder = order =>{
    const schema = Joi.object({
        clientId:Joi.ObjectId().required(),
        serviceProviderId:Joi.ObjectId(),
        serviceType:Joi.ObjectId().required(),
        orderStatus:Joi.string(),
        date:Joi.date().required(),
        startTime:Joi.string().required(),
        totalFee:Joi.Decimal().required().min(10)
    })
    return schema.validate(schema)
}

module.exports = {
    Order,
    orderSchema,
    validationOrder
}