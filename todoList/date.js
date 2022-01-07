let today = new Date();
let currentDay = today.getDay();

let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
}
let day = today.toLocaleDateString("en-US", options);


switch (currentDay) {
    case 0:
        day = "Sunday"
        break;
    case 1:
        day = "Monday"
        break;
    case 2:
        day = "Tuesday"
        break;
    case 3:
        day = "Wednesday"
        break;
    case 4:
        day = "Thursday"
    case 5:
        day = "Friday"
        break;
    case 6:
        day = "Saturday"
        break;
}