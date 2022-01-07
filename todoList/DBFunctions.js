module.exports.addTask = (collection, text) => {
    if (text == null) {
        throw err;
    }
    const o = new collection({
        name: text
    })

    return o
}

module.exports.removeTask = (collection, id) => {
    collection.findByIdAndRemove(id, (err) => {
        if (err) console.log(err);
        else console.log("Item successfully deleted");
    })
}
module.exports.remove = (collection, name) => {
    collection.deleteOne({ name: name }, (err) => {
        if (!err) {
            console.log(name + " deleted succesfully");
        }
    })
}

module.exports.printAllItems = (collection) => {
    collection.find((err, result) => {
        if (err) {
            throw err;
        } else {

            result.forEach(element => {

                console.log(element.name);

            });
        }

    })
}