const port = "8080"
const Corrosion = require('./lib/server')
const express = require('express')
const app = express()

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
    title: "Celestial Network",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com", "pornhub.com", 
        ], "Page is not allowed by Celestial Network"),
    ]
  
})

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.use('/', function (req, res) {
  proxy.request(req,res)
});

app.listen(process.env.PORT || port, () => {
  console.log(`Celestial is running at localhost:${port}`)
})