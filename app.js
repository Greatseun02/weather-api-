const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){

    res.sendFile(__dirname + "/index.html");

})

 app.post("/",function(req, res){
    console.log(req.body.cityName);


    const query = req.body.cityName;
    const apikey = "f6af24dfe6ff59a8f740ccef8c8ce186"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apikey +"&units=" + units + "";
    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            console.log(data);
            const weatherData = JSON.parse(data)
            console.log(weatherData)
            const temp = weatherData.main.temp
            const place = weatherData.name
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write("PLACE - "+ place + "\n")
            res.write("TEMPERATURE - " + temp + "\n")
            res.write("Weather Description - " + description)
            res.write("\nIMAGE - \n")
            res.write("<img src="+ imageURL+ ">")
            res.send()
        })
    })


 })






app.listen(3000,function(){
    console.log("Server is running on port 3000");
})