const port = 3000;
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const ejs = require("ejs")

mongoose.connect("mongodb://localhost:27017/wikiDB")

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.listen(port, () => {

})
const articleSchema = mongoose.Schema({
    title: String,
    content: String
})
const Article = mongoose.model("Article", articleSchema)
app.get("/articles", )

app.post("/articles", )
app.delete("/articles", )

app.route("/articles")
    .get((req, res) => {
        Article.find((err, result) => {
            if (!err) {
                res.send(result)
            } else {
                res.send(err)
            }
        })
    })

.post((req, res) => {
        console.log(req.body.title)
        console.log(req.body.content)
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        article.save((err) => {
            if (err) {
                throw err
            } else {
                res.send("article added")
            }
        })
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (err) {
                throw err
                res.send(err)
            } else {
                res.send("Successfully deleted")
            }
        })
    })
app.route("/articles/:title")

.get((req, res) => {
        let title = req.params.title
        let body = req.body
        Article.findOne({ title: title }, (err, result) => {
            if (err) {
                console.log(err);
                throw err
            } else {
                res.send(result)
            }
        })
    })
    .patch((req, res) => {
        let title = req.params.title
        let body = req.body
        Article.updateOne({ title: title }, { $set: req.body }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Article patched successfully");
            }
        })

    })
    .put((req, res) => {
        Article.update({ title: req.params.title }, { title: req.body.title, content: req.body.content }, (err) => {
            if (err) {
                console.log(err);

            } else {
                res.send("Article updated successfully");
            }
        })
    })
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.title }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("article deleted successfully");
            }
        })
    })