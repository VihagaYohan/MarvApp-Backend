const { serviceSchema, Service, validationService } = require('../models/Services')
const Auth = require('../middleware/Auth')
const ErrorResponse = require('../utility/ErrorResponse')

// @desc    register new user
// @route   POST/api/auth/register
// @access  public
exports.addService = async (Auth, req, res) => {
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