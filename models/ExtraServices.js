const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const extraServices = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'Please add name']
    },
    extraTime:{
        type:mongoose.Types.Decimal128,
        required:[true,'Please add extra-time']
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

//  create extra servce modal
const ExtraService = mongoose.model('ExtraService',extraServices);

// extra service validation
const validationExtraService = service =>{
    const schema = Joi.object({
        name:Joi.string().required(),
        extraTime:Joi.number().required()
    })

    return schema.validate(service)
}

module.exports = {
    extraServices,
    ExtraService,
    validationExtraService
}