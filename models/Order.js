const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require("joi-objectid")(Joi);

const orderSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please add name']
    },
    serviceProviderId: {
        type: mongoose.Types.ObjectId

    },
    serviceType: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please add service type']
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'completed', 'in-progress', 'assigned', 'cancelled'],
        trim: true,
        default: "pending"
    },
    extra_Service: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"ExtraServices"
    },
    workingHours: {
        type: Number,
        required: [true, 'Please add total working hours']
    },
    date: {
        type: Date,
        required: [true, 'Please add date']
    },
    howOften: {
        type: String,
        enum: ['One Time', "Weekly", 'Bi-Weekly', 'Monthly'],
        default: "One Time"
    },
    startTime: {
        type: String,
        enum: ['09.00 AM', "10.00 AM", '11.00 AM', '12.00 PM'],
        default: "09.00 AM",
        required: [true, 'Please add start time']
    },
    totalFee: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please add total service charge']
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// create order model
const Order = mongoose.model('Order', orderSchema);

// order input validation
const validationOrder = order => {
    console.log(order)
    const schema = Joi.object({
        /*  clientId: Joi.objectId().required(),
         //serviceProviderId: Joi.objectId(),
         serviceType: Joi.objectId().required(),
         orderStatus: Joi.string().required(),
         workingHours: Joi.number().required(),
         howOften: Joi.string().required(),
         date: Joi.date().required(),
         startTime: Joi.string().required(),
         totalFee: Joi.number().required().min(10) */

        clientId: Joi.objectId().required(),
        serviceProviderId:Joi.objectId(),
        serviceType: Joi.objectId().required(),
        orderStatus: Joi.string().required(),
        extra_Service:Joi.array(),
        workingHours: Joi.number().required(),
        date: Joi.date().required(),
        howOften: Joi.string().required(),
        startTime: Joi.string().required(),
        totalFee: Joi.number().required().min(10) 
    })
    return schema.validate(order)
}

module.exports = {
    Order,
    orderSchema,
    validationOrder
}