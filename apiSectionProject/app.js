const e = require("express");
const express = require("express");
const port = 3000;
const app = express();
const request = require("request");
const https = require("https");
const { response } = require("express");

app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log("Server is running on port " + port);
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signUp.html")
})

app.post("/", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let data = {
        members: [{
            email_address: req.body.email,
            status: "subscribed",


        }]
    }
    let jsonData = JSON.stringify(data);
    const url = 'https://us5.api.mailchimp.com/3.0/lists/b764a6d13d';
    const options = {
        method: "POST",
        auth: "me:c701342bfe31fe30933a4a213ea5d97b-us5"

    }
    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/faliure.html")
    }
})

//b764a6d13d

//API KEY c701342bfe31fe30933a4a213ea5d97b-us5