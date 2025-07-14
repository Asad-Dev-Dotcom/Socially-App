const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const postRoutes = require('./routes/post.routes')

const app = express()
const authRoutes = require('./routes/auth.routes')

const PORT = 3000
app.use(cors())
app.use(express.json({ limit : '50mb' }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', authRoutes)

app.use('/post', postRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/SocialMediaAppDB')
.then(()=> console.log('Mongodb is connected successfully!!'))
.catch((error)=> console.log('Error in DB connection!!', error))

app.listen(PORT, ()=>{
    console.log(`Server is live at http://localhost:${PORT}`)
})