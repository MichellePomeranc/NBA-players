const express = require('express')
const app = express()
const request = require('request')
const path = require('path')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, '..', 'node_modules')))

app.get('/teams/:teamName', function (req, res) {
    request('http://data.nba.net/10s/prod/v1/2018/players.json', function (error, response, body) {
        let parsedResponse = JSON.parse(response.body)
        let allPlayers = parsedResponse.league.standard
        let noFilterData = allPlayers
            .filter(p => p.teamId === teamToIDs[req.params.teamName])
            .filter(p => p.isActive);
        let filteredData = []
        noFilterData.forEach(p => {
            filteredData.push({
                firstName: p.firstName,
                lastName: p.lastName,
                jersey: p.jersey,
                pos: p.pos
            })
        });
        res.send(filteredData)
    })
})

const port = 8080
app.listen(port, function () {
    console.log(`running server on port ${port}`)
})

