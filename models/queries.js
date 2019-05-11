// Find price series for symbol
db.bittrex.find({symbol: "BTCUSD", date : {$gt: 1526054103,$lt: 1526658903}}, {_id: 0, open: 1, high: 1, low: 1, close: 1})

/*
export remote query result to json
mongoexport --host 127.0.0.1 -u user -p "pass" --db assets -c bittrex --query '{symbol: "BTCUSD", date : {$gt: 1526054103,$lt: 1526658903}}' --fields "open,high,low,close" --out ./models/priceSeriesExample.json --jsonArray --pretty
*/


