const Client = require('node-rest-client').Client;
const client = new Client();


module.exports = function(app) {

	// app.post('/sms', function(req, res) {
	// 	// console.log(req.body.Body);
	// 	const inMessage = req.body.Body;
	// 	const twilio = require('twilio');
	// 	const twiml = new twilio.twiml.MessagingResponse();

	// 	if (inMessage.toUpperCase() !== 'START') {
	// 		twiml.message('Please init with START : ' + inMessage);
	// 		res.writeHead(200, {'Content-Type' : 'text/xml'});
	// 		res.end(twiml.toString());
	// 	} else {
	// 		twiml.message('Welcome to the Club : ' + inMessage);
	// 		res.writeHead(200, {'Content-Type' : 'text/xml'});
	// 		res.end(twiml.toString());
	// 	}
	// });

	app.post('/sms', function(req, res) {
		const inMessage = req.body.Body;
		const inMessageArr = inMessage.split(' ');
		console.log(req.body);

		switch(inMessageArr[0].toUpperCase()) {
			case 'START':
				res.redirect('/startApp');
				break;
			case 'STOCK':
				res.redirect('/stockData/' + inMessageArr[1]);
				break;
			default:
				const twilio = require('twilio');
				const twiml = new twilio.twiml.MessagingResponse();
				twiml.message('Welcome to my test twilio app. ie) stock msft: for stock data, ');
				res.writeHead(200, {'Content-Type' : 'text/xml'});
				res.end(twiml.toString());
		}
	});


	app.post('/stockData/:stockID', function(req, res) {
		const stock = req.params.stockID;
		const StockId = stock.toUpperCase();

		getStock(StockId).then(function(data) {
			const twilio = require('twilio');
			const twiml = new twilio.twiml.MessagingResponse();
			twiml.message('the stock: ' + data.symbol + ' is trading at the bid price of $' + data.price);
			res.writeHead(200, {'Content-Type' : 'text/xml'});
			res.end(twiml.toString());
		});
	});

	function getStock(stockId) {
		return new Promise(function(resolve, reject) {
			console.log(stockId + ' is this what you are looking for');
			const query = 'https://www.enclout.com/api/v1/yahoo_finance/show.json?auth_token=jkDsP5SX4Hum__zGwNBw&text=' + stockId;

			client.get(query, function(data, res) {
				infoSet = {
					price: data[0].bid,
					symbol: data[0].symbol,
					date: data[0].last_trade_date
				}
				resolve(infoSet);
			});
		})
	}
}