const mongoose = require('mongoose');
const macSchema = new mongoose.Schema({
    productKey:String,
    mac:{
        type:String,
        default:''
    }
})

// token used for reset the password

module.exports = mongoose.model('macs', macSchema);