import {Request, Response} from 'express';
import {student} from '../models/student';
//@route GET /api
//@desc Get Student data
//@access private

export async function getData(req:Request,res:Response) {
    try{

        console.log("req",req)
        const studentdata=await student.find();
        if(!studentdata){
            res.json({msg:'no data'})
        }
        res.json(studentdata);
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"server error"});
    }
}

//@route POST /api
//@desc Add Student data
//@access private

export async function addData(req:Request,res:Response) {
    try{
    const body=req.body;
    const studentDataAdd=await student.create({
        id:body.id,
        name:body.name,
    })
    res.status(202).json({msg:'success'});
}
catch(error){
    console.log(error);
    res.status(505).json({msg:"server error"});
}
}


