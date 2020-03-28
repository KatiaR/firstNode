const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let artists = [
	{
		id: 1,
		name: 'Metallica',
	},
	{
		id: 2,
		name: 'Iron Maiden',
	},
	{
		id: 3,
		name: 'Deep Purple',
	},
];

app.get('/', function (req, res) {
	res.send('Hello API');
});

app.get('/artists', function (req, res) {
	db.get()
		.collection('artists')
		.find()
		.toArray(function (err, docs) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(docs);
		});
});

app.get('/artists/:id', function (req, res) {
	db.get()
		.collection('artists')
		.findOne({ _id: ObjectId(req.params.id) }, function (err, doc) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(doc);
		});
});

app.post('/artists', function (req, res) {
	const artist = {
		name: req.body.name,
	};
	db.get()
		.collection('artists')
		.insert(artist, function (err, result) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(artist);
		});
});

app.put('/artists/:id', function (req, res) {
	db.get()
		.collection('artists')
		.updateOne(
			{ _id: ObjectId(req.params.id) },
			{ name: req.body.name },
			function (err, result) {
				if (err) {
					console.log(err);
					return res.sendStatus(500);
				}
				res.sendStatus(200);
			}
		);
});

app.delete('/artists/:id', function (req, res) {
	db.get()
		.collection('artists')
		.deleteOne({ _id: ObjectId(req.params.id) }, function (err, result) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		});
});

db.connect('mongodb://127.0.0.1:27017/mydb', function (err) {
	if (err) {
		return console.log(err);
	}
	app.listen(8080, function () {
		console.log('API started');
	});
});
