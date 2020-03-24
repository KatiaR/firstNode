const express = require("express");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const app = express();
let db;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let artists = [
    {
      id: 1,
      name: 'Metallica'
    },
    {
      id: 2,
      name: 'Iron Maiden'
    },
    {
      id: 3,
      name: 'Deep Purple'
    }
];

MongoClient.connect("mongodb://127.0.0.1:27017/mydb", function(err, database){
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(8080, function() {
        console.log("API started");
    });
});


app.get("/", function(req, res) {
    res.send("Hello API");
});

app.get("/artists", function(req, res) {
    db.collection("artists").find().toArray(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});
   

app.get("/artists/:id", function(req, res) {
    db.collection("artists").findOne({_id: ObjectId(req.params.id)}, function(err, doc){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
});

app.post("/artists", function(req, res) {
    const artist = {
         name: req.body.name
    };
    db.collection("artists").insert(artist, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    });
});

app.put("/artists/:id", function(req, res) {
    const artist = artists.find((oArtist) => {
        return oArtist.id === Number(req.params.id);
    });
    artist.name = req.body.name;
    res.sendStatus(200);
});

app.delete("/artists/:id", function(req, res) {
    artists = artists.filter(function(oArtist) {
       return oArtist.id !== Number(req.params.id)
    })
    res.sendStatus(200);
});


