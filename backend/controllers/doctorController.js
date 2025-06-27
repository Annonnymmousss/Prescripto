import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const changeAvailabiltiy = async(req,res) =>{
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true , message: "Availability changed"})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error}) 
    }
}

const doctorList = async(req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select(['-password' , '-email'])
        res.json({success:true , doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error}) 
    }
}

const loginDoctor = async(req,res) => {
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false , message:"Invalid Credentials"})
        }
        const isMatch = await bcrypt.compare(password , doctor.password )
        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            return res.json({success:true , token})
        }else{
            return res.json({success:false , message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error}) 
    }
}
export {
    changeAvailabiltiy,doctorList,loginDoctor
}