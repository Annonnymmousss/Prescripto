import express, { Router } from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../middlwares/authUser.js'
import upload from '../middlwares/multer.js'

const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)

userRouter.get('/get-profile' , authUser , getProfile)

userRouter.post('/update-profile', upload.single('image') , authUser , updateProfile  )
userRouter.post('/book-appointment', authUser ,bookAppointment)
userRouter.post('/appointments', authUser ,listAppointment)
userRouter.post('/cancel-appointment', authUser ,cancelAppointment)
userRouter.post('/payment-razorpay', authUser , paymentRazorpay)
export default userRouter