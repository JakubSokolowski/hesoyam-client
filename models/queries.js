db.bittrex.find({symbol: "BTCUSD", date : {$gt: 1526054103,$lt: 1526658903}}, {open: 1, high: 1, low: 1, close: 1})
