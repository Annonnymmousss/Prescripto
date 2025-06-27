import express from 'express'
import { addDoctor , adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js'

import upload from '../middlwares/multer.js'
import authAdmin from '../middlwares/authAdmin.js'
import { changeAvailabiltiy } from '../controllers/doctorController.js'



const adminRoute = express.Router()

adminRoute.post('/add-doctor' ,authAdmin,upload.single('image'), addDoctor)
adminRoute.post('/login' , loginAdmin)
adminRoute.post('/all-doctors' ,authAdmin ,  allDoctors)
adminRoute.post('/change-availabilty' ,authAdmin , changeAvailabiltiy)
adminRoute.get('/appointments' ,authAdmin , appointmentsAdmin)
adminRoute.post('/cancel-appointment' ,authAdmin , appointmentCancel)
adminRoute.get('/dashboard' ,authAdmin , adminDashboard)



export default adminRoute