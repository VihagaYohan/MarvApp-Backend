const mongoose = require('mongoose');
const Joi = require('joi')
const { Order, validationOrder } = require('../models/Order');
const ErrorResponse = require('../utility/ErrorResponse');

// @desc    get all orders
// @route   GET/api/orders/
// @access  PRIVATE
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (orders.length == 0) {
            return next(new ErrorResponse('There are no orders to show', 404))
        }

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    get all order by Id
// @route   GET/api/orders/:id
// @access  PRIVATE
exports.getOrderById = async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.id).populate('extra_Service');
        if (!order) return next(new ErrorResponse(error.details[0].message))

        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    create order
// @route   POST/api/orders/
// @access  PRIVATE
exports.createOrder = async (req, res, next) => {
    try {
        // input data validation
        const { error } = validationOrder(req.body);
        console.log(error)
        if (error) return next(new ErrorResponse(error.details[0].message), 400)/* */



        const { clientId, serviceType, workingHours, orderStatus, extraService, howOften, date, startTime,
            totalFee } = req.body

        let order = await Order({
            clientId: mongoose.Types.ObjectId(clientId),
            serviceType: mongoose.Types.ObjectId(serviceType),
            workingHours: workingHours,
            orderStatus: orderStatus,
            extraService: extraService,
            date: date,
            howOften: howOften,
            startTime: startTime,
            totalFee: totalFee
        })
        order = await order.save();

        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    update order
// @route   PUT/api/orders/:id
// @access  PRIVATE
exports.updateOrder = async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return next(new ErrorResponse('Unable to locate order for the given ID', 404))

        // check for input data validation
        const { error } = validationOrder(req.body);
        console.log(error)
        if (error) return next(new ErrorResponse(error.details[0].message, 400));

        let { clientId,
            serviceProviderId,
            serviceType,
            orderStatus,
            extra_Service,
            workingHours,
            date,
            howOften,
            startTime,
            totalFee } = req.body

        order.clientId = clientId;
        order.serviceProviderId = serviceProviderId;
        order.serviceType = serviceType;
        order.orderStatus = orderStatus;
        order.extra_Service = extra_Service;
        order.workingHours = workingHours
        order.date = date;
        order.howOften = howOften
        order.startTime = startTime;
        order.totalFee = totalFee;

        order = await Order.findByIdAndUpdate(order._id, order, { new: true });

        res.status(200).json({
            success: true,
            data: order

        })

    } catch (error) {
        next(error.message, 500);
    }

}

// @desc    delete order
// @route   DELETE/api/orders/:id
// @access  PRIVATE
exports.deleteOrder = async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return next(new ErrorResponse('Unable to locate order for given ID', 404))

        // delete order from database
        order.isDelete = true

        order = await Order.findByIdAndUpdate(order._id, order, { new: true })

        res.status(200).json({
            success: true,
            data: order
        })


    } catch (error) {
        next(error.message, 500);
    }
}