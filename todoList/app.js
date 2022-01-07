const port = 3000;
const _ = require("lodash");
const express = require("express");
const app = express();
const mongooose = require("mongoose")
const DBF = require(__dirname + "/DBFunctions.js")
mongooose.connect("mongodb://localhost:27017/todoListDB")

const TaskSchema = mongooose.Schema({
    name: String
})
const Task = mongooose.model("Task", TaskSchema)
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
let work = []
let items = []
const buyFood = DBF.addTask(Task, "Buy food!")
const cookFood = DBF.addTask(Task, "Cook food!");
const eatFood = DBF.addTask(Task, "Eat food!");

const foodTasks = [buyFood, cookFood, eatFood];

const listSchema = mongooose.Schema({
    name: String,
    tasks: [TaskSchema]
});

const List = mongooose.model("List", listSchema)


app.get("/", (req, res) => {
    Task.find((err, result) => {
        if (err) {
            throw err;
        }
        if (result.length == 0) {
            Task.insertMany(foodTasks);
            res.redirect("/")

        } else {
            res.render("list", { listTitle: "Today", newListItems: result })

        }
    })
})



app.get("/:title", (req, res) => {
    const listName = _.capitalize(req.params.title);
    List.findOne({ name: listName }, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                let list = new List({
                    name: listName,
                    tasks: foodTasks
                })
                list.save()
                res.redirect(`${listName}`)
            } else {
                res.render("list", { listTitle: foundList.name, newListItems: foundList.tasks })

            }
        }
    })
})

DBF.printAllItems(List);

app.get("/about", (req, res) => {
    res.render("about")
})

app.post("/", (req, res) => {
    const listName = req.body.list
    console.log(listName);
    console.log(req.body.task);

    const task = DBF.addTask(Task, req.body.task)
    console.log(task);

    if (listName == "Today") {
        task.save()
        res.redirect("/")
    } else {
        List.findOne({ name: listName }, (err, foundList) => {

            foundList.tasks.push(task)
            console.clear()
            foundList.save()
            res.redirect(`/${listName}`)

        })
    }
})

app.post("/delete", (req, res) => {
    const listName = req.body.listName;
    if (listName == "Today") {
        Task.findByIdAndRemove(req.body.checkbox, (err) => {
            if (err) throw err;
            console.log("deleted");
        })
        res.redirect("/")
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { tasks: { _id: req.body.checkbox } } }, (err, foundList) => {
            if (!err) {
                res.redirect(`/${listName}`)
            }
        })
    }


})

app.listen(3000, () => {
    console.log("Server is running on port " + port);
})