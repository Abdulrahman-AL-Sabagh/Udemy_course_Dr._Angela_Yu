const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log("Hello your server is running on this port " + port);
})


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.post("/", (req, res) => {
    res.send("Thanks for posting that");
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let calculation = num1 + num2;
    res.send("the result of the calculation is " + calculation);
})