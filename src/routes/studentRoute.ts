import express from 'express';
import {getData,addData} from '../controller/studentController';

const router=express.Router();

router.route('/')
        .get(getData)
        .post(addData)


export default router;