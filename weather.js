const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/weather.html") 
})

app.post("/",function(req,res){

const cityname = req.body.Cityname;
const apikey = "08d0b2bf5188d67bc94d517ee9d21456";
const tempunit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname +"&appid="+ apikey +"&units="+ tempunit +""
https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
        const weatherdata = JSON.parse(data);
        const weatherstatustemp = weatherdata.main.temp; 
        const weatherstatusfeelslike = weatherdata.main.feels_like;
        // const icon = weatherdata.weather[0].icon
        // const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        console.log(weatherstatustemp)
        console.log(weatherstatusfeelslike)
        // console.log(icon)
        // console.log(imageURL)
        // res.write("img src = "+ imageURL + ">");
        res.write("<h1>the temperature in " + cityname  +" is " + weatherstatustemp + " degree celsius but it feels like " + weatherstatusfeelslike + " degree celsius</h1>");
        res.send();
    })
})

// res.send("weatherstatus");
})





app.listen(3000, function () {
    console.log("listening on 3000");
})