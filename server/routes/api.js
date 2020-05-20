const express = require('express')
const City = require('../model/City')
const router = express.Router()
const bodyParser = require('body-parser')
const request = require('request');
const moment = require('moment');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))


router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    if (cityName) {
        request(`http://api.weatherstack.com/current?access_key=5e11a1c43a1296b2db2a248c7c6ee7cc&query=${cityName}`, function (error, response) {
            if (error) { res.send('apixu_API :error ' + error) }
            let cityAPI = JSON.parse(response.body)
            if (!(response.body)) {
                console.log("no data from API")
            } else {
                res.send({
                    name: cityAPI.location.name,
                    updatedAt: moment().format('LLLL'),
                    temperature: cityAPI.current.temperature,
                    condition: cityAPI.current.weather_descriptions[0],
                    conditionPic: cityAPI.current.weather_icons[0],
                })
            }
        })
    } else { alert("City Not Fond") }
});

router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city', function (req, res) {
    const city = new City(req.body)
    city.save()
    res.send("city saved")
})

router.delete('/city/:cityName', function (req, res) {
    City.remove({ name: req.params.cityName })
        .exec(function (err, city) {
            res.send(`${city.name} delete`)
        })
})

module.exports = router