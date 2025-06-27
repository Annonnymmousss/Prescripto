import express from 'express'
import { appointmentCancelled, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, loginDoctor } from '../controllers/doctorController.js'
import authDoctor from '../middlwares/authDoctor.js'

const doctorRouter = express.Router()


doctorRouter.get('/list' , doctorList)
doctorRouter.post('/login' , loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancelled)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
export default doctorRouter