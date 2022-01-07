const { GridFSBucketWriteStream, MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/fruitsDB")

const FruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})
const Fruit = mongoose.model("Fruit", FruitSchema)
const fruit = new Fruit({
    name: "Apple",
    rating: 5,
    review: "not my lovling"
})

Fruit.deleteMany({ name: "Apple" }, (err) => {
    if (err) throw err;

})
const pinApple = new Fruit({
    name: "Pinapple",
    rating: 10,
    review: "SUPER FURIT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    favouriteFruit: FruitSchema
})

const Person = mongoose.model("Person", personSchema);

const person2 = new Person({
    name: "Max",
    age: 20,
    favouriteFruit: pinApple
})
printElements(Person)
Person.updateOne({ _id: "613dfa60bdb7e2f218876f1a" }, { $set: { name: "Bob" } }, (err) => {
    if (err) throw err;
    else console.log(this.name);
})
Person.deleteOne({ name: "Max" }, (err) => {
    if (err) console.log(err);
})

Person.find((err, result) => {
    if (err) {
        throw err
    } else {
        result.forEach(element => {
            console.log(element.name);
        });
    }
})


printElements(Fruit)

function printElements(collection) {
    collection.find((err, result) => {
        if (err) throw err;
        result.forEach(element => {
            console.log(element.name);
        });
    })
}

function deleteElement(collection, value) {
    collection.deleteOne({ name: value }, (err) => {
        if (err) throw err;
        printElements(collection)
    })
}