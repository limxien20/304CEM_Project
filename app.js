const Location = require('./dbconn.js');
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const apikey = 'pk.321250034965f0cb8471b465e5239fa1';
const apikey2 = 'dce420e5122d494b8acf64489651d69e';


app.use(cors())
app.use(express.json()); //parse anything into JSON

var latitude, longitude, display_name;

app.get('/getLocation', (req, res) =>{

    const place = req.query.place;
    const querystr = `https://us1.locationiq.com/v1/search.php?key=${apikey}&q=${place}&format=json`;
    const querystr2 = `https://api.ipgeolocation.io/timezone?apiKey=${apikey2}&location=${place}`;

    axios.get(querystr).then( (response) =>{
      axios.get(querystr2).then( (response2) =>{

          latitude = response.data[0].lat;
          longitude = response.data[0].lon;
          display_name = response.data[0].display_name;

          timezone = response2.data.date_time_txt;

          
          res.send("Latitude: " + response.data[0].lat + "     Longitude: " + response.data[0].lon +  "     Location Name: " + response.data[0].display_name +  "     Timezone: " + response2.data.date_time_txt);

          locationValue = new Location({
              latitude: latitude,
              longitude: longitude,
              display_name : display_name,
              timezone: timezone
          });
          locationValue.save()
          .then((response) => {
            res.status(200).json(response);
          })
          .catch((error) => {
            res.status(400).json(error);
          });

      });
    });
});

app.get("/getAllLocation", (req, res) => {
    Location.find({}).then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(400).json(error);
        
      });
});

app.get("/deleteLocation", (req,res) => {
  Location.deleteOne({ place : req.query.place }).then((response) =>{
    res.status(200).json(response);
  })
  .catch((error) =>{
    res.status(400).json(error);
  });

});

app.listen(5000, ()=>{
    console.log('Server listening to port 5000');
});