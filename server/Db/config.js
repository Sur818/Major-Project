const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://amit:amit12@cluster0.szzrgme.mongodb.net/major?retryWrites=true&w=majority')

mongoose.connection.on('error', err =>{
    console.log('Connection failed')
})
mongoose.connection.on('connected', connected =>{
    console.log('Connected with database')
})
