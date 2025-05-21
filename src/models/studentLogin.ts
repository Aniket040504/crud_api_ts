import mongoose, {Document,Schema} from "mongoose";

interface studentlogindetails extends Document{
    name:string,
    email:string,
    password:string
    _id: Types.ObjectId;

}

const userSchema: Schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Enter your name'],
    },
    email:{
        type:String,
        required:[true, 'Please Enter your email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Please Enter a strong Password'],
    },
},
{
    timestamps:true,
}
);

export const studentdetails=mongoose.model<studentlogindetails>('stud',userSchema);