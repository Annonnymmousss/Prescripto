import express, { Router } from 'express'
import { bookAppointment, getProfile, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../middlwares/authUser.js'
import upload from '../middlwares/multer.js'

const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)

userRouter.get('/get-profile' , authUser , getProfile)

userRouter.post('/update-profile', upload.single('image') , authUser , updateProfile  )
userRouter.post('/book-appointment', authUser ,bookAppointment)
export default userRouter