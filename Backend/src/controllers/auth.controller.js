const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require("../models/blacklist.model");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

const registerUserController = async (req, res) => {

    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isuserAlreadyPresent = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if(isuserAlreadyPresent){
        if(isuserAlreadyPresent.username == username || isuserAlreadyPresent.email == email){
            return res.status(400).json({
                message: "Account already exists with this username or email"
            })
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username 
    }, process.env.JWT_SECRET, {expiresIn: "1d"});


    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24*60*60*1000
    });

    res.status(201).json({
        message: "user registeres successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

/**
 * @route POST /api/auth/login
 * @description login a user
 * @access Public
 */
const loginUserController = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username 
    }, process.env.JWT_SECRET, {expiresIn: "1d"});


    res.cookie("token", token, {
        httpOnly: true,
        secure: false,   // localhost
        sameSite: "lax", // or 'none' + secure:true if HTTPS
        maxAge: 24*60*60*1000
    });

    res.status(201).json({
        message: "user logedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

/**
 * @description clear token from user cookie and token in the blacklist
 * @route GET /api/auth/logout
 * @access Public
 */
const logoutUserController = async (req, res) => {

    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "user logged out successfully"
    })

}

/**
 * @description get the current logged in user details
 * @name getMeController
 * @access Private
 */
const getMeController = async (req, res) => {

    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: "userdetails fetched succesfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }
