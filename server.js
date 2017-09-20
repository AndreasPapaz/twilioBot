const client = require('twilio')('ACf0d23e492b6558493ecbe708fa8cb292', 'd279750e386d3cc08fe35f658d51644f');
const express = require('express');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();
const sess = {
	secret: 'twilio token',
	cookie: {}
}

app.use(session(sess));
app.use(bodyParser.urlencoded({ extended: false }));
require('./api/route.js')(app);

app.listen(PORT, function() {
	console.log("TWILIO APP IS LIVE");
});
