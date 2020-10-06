const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forcast = require("./utils/forcast.js")
const geoCode = require("./utils/geocode.js");

const app = express();
//pathes to the specific dir
const pathPublicDir = path.join(__dirname, "../public");
const pathViews = path.join(__dirname, "../templetes/views");
const partialsPath = path.join(__dirname, "../templetes/partials");
const port = process.env.PORT || 3000

//setup view engine to serve
app.set("view engine", "hbs");
app.set("views", pathViews);
hbs.registerPartials(partialsPath);

app.use(express.static(pathPublicDir));

app.get("", (req, res) => {
    res.render("index", {
        title:"Weather",
        name:"yazan al sharif"
    })
});

app.get("/about", (req, res) => {
    res.render("about", {
        title:"About me",
        name:"yazan al sharif"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title:"Help",
        name:"yazan al sharif",
        helpText: "This is some helpfull information"
    })
})

//get the 
app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"you must search for an address"
        })
    }
    geoCode(req.query.address, (geoCodeError, {latitude, longtitude, place} = {}) => {
        if(geoCodeError) {
            return res.send({
                error:geoCodeError
            })
        }
        forcast(latitude, longtitude, (forcastError, weatherData) => {
            if(forcastError) {
                return res.send({
                    error:forcastError
                })
            }
            res.send({
                temperature:weatherData.temperature,
                wind_speed:weatherData.wind_speed,
                desc:weatherData.desc,
                place
            })
        })
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "This subdomain does't exist",
        title: "404",
        name: "yazan alsharif"
    })
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "404 page Note Found",
        title: "404",
        name: "yazan alsharif"
    })
})

app.listen(port, () => {
    console.log("the server up on port " + port);
});

