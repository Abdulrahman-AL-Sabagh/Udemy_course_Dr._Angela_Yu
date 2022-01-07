const port = 3000;
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }))

app.get("/bmiCalculator", (req, res) => {
    res.sendFile(`${__dirname}/bmiCalculator.html`)
})

app.post("/bmiCalculator", (req, res) => {
    let height = Number(req.body.height);
    let weight = Number(req.body.weight);

    res.send("BMI result is " + `${weight /(height * height)}`)
})

app.listen(port, () => {
    console.log("Your server is running on port/bmiCalculator " + port);
})