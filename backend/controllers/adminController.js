import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

//api for adding doctors


const addDoctor=async(req,res)=>{
    try {
        const {name,email,speciality,fees,address,about,experience,password,degree,date} = req.body
        const imageFile = req.file

        if(!name||!email||!speciality||!fees||!address||!about||!experience||!password||!degree){
            return res.json({success:false , message:"Missing Details"})

        }

        if (!validator.isEmail(email)){
            return res.json({success:false , message:"Please enter a valid email"})

        }

        if(password.length<8){
            return res.json({success:false , message:"Please enter a strong password"})
        }

        //hashing doctor password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        

        //uploading image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type:'image'})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            speciality,
            fees,
            address:JSON.parse(address),
            about,
            experience,
            password:hashedPassword,
            degree,
            image:imageUrl,
            date,
            
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true , message:"Doctor added"})

        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error})
    }
}

const loginAdmin = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true , token})
        }else{
            res.json({success:false , message:'Invalid Credential'})
        }
        
    } catch (error) {
        
        console.log(error)
        res.json({success:false , message:error}) 
    }

}

const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true , doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error}) 
    }
}
export {
    addDoctor,loginAdmin , allDoctors
}