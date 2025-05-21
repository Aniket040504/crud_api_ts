import mongoose, {Document,Schema} from "mongoose";

interface IStudent extends Document{
    name:string
}

const studentSchema: Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
});

export const student=mongoose.model<IStudent>('stu',studentSchema);