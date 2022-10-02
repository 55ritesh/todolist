const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy", "COOK", "eat"];
//app.set("view engine", "ejs");
var workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
});


app.post("/", function (req, res) {
    var item = req.body.newItem;
    items.push(item)
    res.redirect("/");
});


app.post("/work", function (req, res) {
    var item = req.body.newItem;
    //console.log(item);
    workItems.push(item);
    // res.render("list", { newlistitem: item });
    res.redirect("/work");
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListenItems: workItems });
});

app.listen(3000, function () {
    console.log("server started on port 3000");
});