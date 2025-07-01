import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRoute from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const PORT = process.env.PORT||3000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin' , adminRoute)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRouter)
app.get('/',(req,res)=>{
    res.send('helolo')
})

app.listen(PORT , ()=>console.log('server started'))