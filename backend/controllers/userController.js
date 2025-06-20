import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'

const registerUser = async(req,res) =>{
    try {
        const {name , email , password} = req.body
        if(!name||!password||!email){
            return res.json({success:false , message:"Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false , message:"Enter a strong password"})
        }

        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)

        return res.json({success:true , token:token , message:'Account Created Succesfully'})

    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error}) 
    }
}


const loginUser = async(req,res) => {
    try {
        const {email , password} = req.body
        const user = await userModel.findOne({email})        
        if(!user){
            return res.json({success:false , message:"user doesnt exists"})
        }

        const isMatch = await bycrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true , token:token , message:'Login Succesfully'})
        }else{
            return res.json({success:false , message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error}) 
    }
}


const getProfile = async(req,res) => {
    try {
        // const{userId} = req.body
        const userData = await userModel.findById(req.userId).select('-password')
        res.json({success:true , userData})
    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error}) 
    }
}


const updateProfile = async(req,res) => {
    try {
        const { name , dob , phone , address , gender} = req.body
        const imageFile = req.file

        if(!name || !dob || !phone || !address || !gender){
            return res.json({success:false , message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(req.userId , {name , phone , address:JSON.parse(address), gender , dob})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type:"image"} )
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(req.userId , {image:imageUrl})
        }
        return res.json({success:true , message:"Profile Updated"})
    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error}) 
    }
}

const bookAppointment = async(req,res) => {
    try {
        const {docId , slotDate , slotTime} = req.body
        const userId = req.userId
        const docData = await doctorModel.findById(docId).select("-password")
        if(!docData.available){
            return res.json({success:false , message:"Doctor not available"})
        }
        const slots_booked = docData.slots_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false , message:"slot not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotDate,
            slotTime,
            date:Date.now(),
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId , {slots_booked})

        res.json({success:true , message:'appointment booked'})
    }
    catch(error){
        console.log(error)
        return res.json({success:false , message:error}) 
    }
}
export{
    registerUser , loginUser , getProfile , updateProfile , bookAppointment
}