const mongoose = require('mongoose');


const db = "mongodb+srv://XiEn:test123@cluster0.yzbvz.mongodb.net/LocationDB?retryWrites=true&w=majority";

mongoose.connect(db).then(()=>{
    console.log("connected to database");
}).catch(()=>{
    console.log("error connecting to database");
});

const locationSchema = new mongoose.Schema({
    
    latitude: {type: String},
    longitude: {type: String},
    display_name: {type: String},
    timezone: {type: String}
});

const Location = mongoose.model('locations', locationSchema);

module.exports = Location;