const { serviceSchema, Service, validationService } = require('../models/Services')
const ErrorResponse = require('../utility/ErrorResponse')

// @desc    get all services
// @route   GET/api/services/
// @access  public
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if (services.length == 0) return next(new ErrorResponse('There are no services to show', 404))
        res.status(200).json({
            success: true,
            data: services
        })
    } catch (error) {
        next(error.message, 500);
    }
}

// @desc    add new service
// @route   POST/api/services/
// @access  private
exports.addService = async (req, res) => {
    try {
        // validate service
        const { error } = validationService(req.body)
        if (error) return next(new ErrorResponse(error.details[0].message, 400))

        const { name, backgroundColor, iconColor } = req.body
        let service = await Service({
            name: name,
            backgroundColor: backgroundColor,
            iconColor: iconColor
        });
        service = await service.save();

        res.status(200).json({
            success: true,
            data: service
        })
    } catch (error) {
        next(error.message, 500);
    }
}

// @desc    update service
// @route   PUT/api/services/:id
// @access  private
exports.updateService = async (req, res) => {
    try {

        // check for input data validation
        const { error } = validationService(req.body);
        if (error) return next(new ErrorResponse(error.details[0].message, 400));

        let service = await Service.findById(req.params.id);
        if (!service) return next(new ErrorResponse('Unable to locate service for given ID', 404))

        let { name, backgroundColor, iconColor } = req.body
        service.name = name;
        service.backgroundColor = backgroundColor;
        service.iconColor = iconColor;

        service = await Service.findByIdAndUpdate(service._id, service, { new: true })

        res.status(200).json({
            success: true,
            data: service
        })
    } catch (error) {
        next(error.message, 500);
    }
}

// @desc    delete service
// @route   DELETE/api/services/:id
// @access  delete
exports.deleteService = async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);
        if (!service) return next(new ErrorResponse('Unable to locate service for given ID', 404))

        // delete service from database
        service.isDelete = true

        service = await Service.findByIdAndUpdate(service._id, service, { new: true })

        res.status(200).json({
            success: true,
            data: service
        })


    } catch (error) {
        next(error.message, 500);
    }
}