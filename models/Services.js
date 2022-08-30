const mongoose = require('mongoose');
const Joi = require('joi')

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a service name'],
        trim: true,
        minLength: [2, 'Name should be longer than 2 characters'],
        maxLength: [50, 'Name should not be longer than 50 characters']
    },
    backgroundColor:{
        type:String,
        default:'rgba(237, 47, 47,0.53)'
    },
    iconColor:{
        type:String,
        default:'rgba(255, 255, 255)'
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }

})

// create service model
const Service = mongoose.model('Service', serviceSchema);

// validation for service model
const validationService = service => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50),

    })
    return schema.validate(service)
}

module.exports = {
    serviceSchema,
    Service,
    validationService
}