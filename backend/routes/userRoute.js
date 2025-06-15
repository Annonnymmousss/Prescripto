import express, { Router } from 'express'
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../middlwares/authUser.js'
import upload from '../middlwares/multer.js'

const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)

userRouter.get('/get-profile' , authUser , getProfile)

userRouter.post('/update-profile', upload.single('image') , authUser , updateProfile  )
export default userRouter