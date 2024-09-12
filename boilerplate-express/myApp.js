let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let msg = require('dotenv').config();
let note = { "message": "Hello json" }
console.log("Hello World");
// app.get("/", function (req, res) {
//     res.send("Hello Express")
// })

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    let string = `${req.method} ${req.path} - ${req.ip}`;
    console.log(string);
    next();
})

app.get("/", function (req, res) {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
})

app.use("/public", express.static(__dirname + '/public'));

app.get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        note.message = note.message.toUpperCase();
    }
    res.json(note);
})

app.get("/now", function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json({ time: req.time });
})

app.get("/:word/echo", function (req, res) {
    let word = req.params.word;
    res.json({ echo: word });
})

app.get("/name", function (req, res) {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
})

app.post("/name", function (req, res) {
    res.json({ name: `${req.body.first} ${req.body.last}` })
})

module.exports = app;
