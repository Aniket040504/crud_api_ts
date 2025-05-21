import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {studentdetails} from '../models/studentLogin';
import { userInfo } from 'os';

// @desc Register User
// @route POST /api/user/signup
// @access Public

export const registerUser= async(req:Request,res:Response)=>{
    try{
    const {name,email,password}=req.body;
    const existing=await studentdetails.findOne({email});
    if(existing){
        res.status(400).json({msg:"user exist"});
    }

    const salt=await bcrypt.genSalt(10);
    const hashpass=await bcrypt.hash(password,salt);

    const newUser=await studentdetails.create({
        name:name,
        email:email,
        password:hashpass
    })

    if(newUser){
        res.status(201).json({
            _id:newUser._id,
            name:name,
            email:newUser.email
        })
    }
    else{
        res.status(404).json({msg:'data not found'});
    }
}
catch(error){
    console.log(error);
    res.status(500).json({msg:'server error'});s
}
}

// @desc Authenticate User
// @route POST /api/user/login
// @access Public

export const loginUser=async(req:Request,res:Response)=>{
    try{
    const {email,password}=req.body;
    const user=await studentdetails.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const token = generateToken(user._id);

        res.status(202).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:token,
    })
}
    else{
        res.status(404).json({msg:'not found'});
    }
}
catch(error){
    console.log(error);
    res.status(500).json({msg:'server error'});
}
}

const generateToken=(id:string)=>{
   { if(!process.env.JWT_SECRETKEY)
    throw new Error("JWT_SECRETKEY is not defined in .env");
}
    return jwt.sign({
        id
    },
    process.env.JWT_SECRETKEY,
    {
        expiresIn:'30d',
    }
)}
