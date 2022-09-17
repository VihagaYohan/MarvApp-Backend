const mongoose = require('mongoose');
const {
    ExtraService,
    validationExtraService
} = require('../models/ExtraServices')
const ErrorResponse = require('../utility/ErrorResponse');

// @desc    get all extra services
// @route   GET/api/extraServices/
// @access  PRIVATE
exports.getAllExtraServices = async (req, res, next) => {
    try {
        const services = await ExtraService.find();
        if (services.length == 0) {
            return next(new ErrorResponse('There are no extra services', 404))
        }

        res.status(200).json({
            success: true,
            data: services
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    get extra service by Id
// @route   GET/api/extraServices/:id
// @access  PRIVATE
exports.getExtraService = async (req, res, next) => {
    try {
        let service = await ExtraService.findById(req.params.id);
        if (!service) return next(new ErrorResponse(error.details[0].message))

        res.status(200).json({
            success: true,
            data: service
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    create order
// @route   POST/api/extraServices/
// @access  PRIVATE
exports.createExtraService = async (req, res, next) => {
    try {
        // input data validation
        const { error } = validationExtraService(req.body);
        if (error) return next(new ErrorResponse(error.details[0].message), 400)


        const { name, extraTime } = req.body

        let service = await ExtraService({
            name: name,
            extraTime: extraTime
        })
        service = await service.save();

        res.status(200).json({
            success: true,
            data: service
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    update extra service
// @route   PUT/api/extraServices/:id
// @access  PRIVATE
exports.updateExtraService = async (req, res, next) => {
    try {
        let service = await ExtraService.findById(req.params.id);
        if (!service) return next(new ErrorResponse('Unable to locate extra-service for the given ID', 404))

        // check for input data validation
        const { error } = validationExtraService(req.body);
        if (error) return next(new ErrorResponse(error.details[0].message, 400));

        let {name,extraTime} = req.body

        service.name = name
        service.extraTime = extraTime

        service = await ExtraService.findByIdAndUpdate(service._id, service, { new: true });

        res.status(200).json({
            success: true,
            data: service

        })

    } catch (error) {
        next(error.message, 500);
    }

}

// @desc    delete extra service
// @route   DELETE/api/extraServices/:id
// @access  PRIVATE
exports.deleteExtraservice = async (req, res, next) => {
    try {
        let service = await ExtraService.findById(req.params.id);
        if (!service) return next(new ErrorResponse('Unable to locate extra-service for given ID', 404))

        // delete order from database
        service.isDelete = true

        service = await ExtraService.findByIdAndUpdate(service._id, service, { new: true })

        res.status(200).json({
            success: true,
            data: service
        })


    } catch (error) {
        next(error.message, 500);
    }
}