const userModel = require('../models/models/User.model')
// const bcrypt = require('bcrypt');
const UserModel = require('../models/models/User.model');
const jwt = require('jsonwebtoken');
const mq = require('./rabbitmq')

module.exports = {
    getUser : async(req,res,next) => {
        try {
            const user = await userModel.find();
            res.json({user});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    addUser : async(req,res,next) => {
        const {name, email, password, role, createDate} = req.body;
        try {
            let user = await userModel.findOne({name, email});
            if(user) res.status(401).json({error: "Name or email is valid"})
             user = new userModel({
                name, 
                email, 
                password, 
                role, 
                createDate
            });
            // mq.publish('user', 'created_user',JSON.stringify(user))
            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(password, salt);
            // console.log({user});


            user.save();
            res.json({user, status: "Success"})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    deleteUser: async(req,res,next) => {
        const id = req.params.id;
        try {
            const user = await userModel.findByIdAndDelete(id);
            user.save();
            res.json({user, status: "Success"});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    editUser : async(req,res,next) => {
        const id = req.params.id;
        const {name, email, password, role} = req.body; 
        
        try {
            let users = await userModel.findOne({email});
            if(users) return res.status(401).json({error: "Email is valid"});

            let user = await userModel.findById(id);
            if(!user) res.status(401).json({error:"Id is invalid"})
            // if(email) res.status(401).json({error: "Email is valid"})
            user.name = name;
            user.email = email;
            user.password = password;
            user.role = role;
            user.save();
            res.json({user, status: "Success"})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    },
    loginUser: async(req,res,next) => {
        const {email, password} = req.body;
        try {
            const user = await UserModel.findOne({email});
            if(!user){
                res.status(401).json({error: "khong ton tai"})
            }
            const isMatch = bcrypt.compare(password, user.password);
            if(!isMatch){
                res.status(401).json({error: "sai"});
            }

            const payload = {
                user:{
                    id: user.id,
                    role: user.role
                }
            }

            // Json web token

            jwt.sign(payload, process.env.secretKey, {
                expiresIn:360000000
            }, (err, token)=>{
                if(err) throw err
                res.json({
                    token,
                    success: true
                })
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server errors");
        }
    }
}