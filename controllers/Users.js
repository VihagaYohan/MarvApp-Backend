const { userSchema,
    validationUser,
    User } = require('../models/User')
const ErrorResponse = require(
    '../utility/ErrorResponse'
)

// @desc    get all users
// @route   GET/api/users/
// @access  public
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length == 0) return next(new ErrorResponse('There are no users to show', 404))

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    get user by Id
// @route   GET/api/users/:id
// @access  public
exports.getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return next(new ErrorResponse("Unable to locate user for the given ID", 404))

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error.message, 500)
    }
}

// @desc    update user data
// @route   PUT/api/users/:id
// @access  public
exports.updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return next(new ErrorResponse("Unable to locate user for the given ID", 404))

        // user data input validation
       let {error} = validationUser(req.body);
       if(error) return next(new ErrorResponse(error.details[0].message,400))

       let {name,email,phoneNumber,description} = req.body;
       user.name = name;
       user.email = email;
       user.phoneNumber = phoneNumber;
       user.description = description;

       user = await User.findByIdAndUpdate(user._id,user,{new:true});

       res.status(200).json({
        success:true,
        data:user
       })
    } catch (error) {
        next(error.message, 500)
    }
}