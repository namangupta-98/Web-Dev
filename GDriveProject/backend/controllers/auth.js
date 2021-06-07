const User = require('../models/user');
const Folder = require('../models/folder');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const fs = require("fs");

exports.signup = (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        const { name, email, password } = req.body;
        let username = shortId.generate();

        let newUser = new User({ name, email, password, username });
        fs.mkdir("./public/"+username, function(err) {
            if (err) {
                res.status(301).json({
                    message: 'Folder Not Created!'
                });
            } else {
                newUser.save((err, success) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }else{
                        res.status(200).json({
                            message: 'Signup success! Please signin.'
                        });
                    }
                });
            }
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec( (err, user) => {
        if (!user || err) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '365d' });
        
        res.cookie('token', token, { expiresIn: '365d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};

exports.requireSignin = expressJwt({ secret:  process.env.JWT_SECRET, algorithms: ['HS256'] });


exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user = {id: user._id, name: user.name, email: user.email, username: user.username, createdAt: user.createdAt, updatedAt: user.UpadatedAt}
        req.profile = user;
        next();
    });
};