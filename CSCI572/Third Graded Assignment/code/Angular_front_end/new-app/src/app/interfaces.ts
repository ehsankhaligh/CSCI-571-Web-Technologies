/*
{
	"count": 23,
	"result": [{
		"description": "TESLA INC",
		"displaySymbol": "TSLA",
		"symbol": "TSLA",
		"type": "Common Stock"
	}, {
		"description": "TESLA INC",
		"displaySymbol": "TSLA.VI",
		"symbol": "TSLA.VI",
		"type": "Common Stock"
	}, {
		"description": "TESLA INC",
		"displaySymbol": "TSLA.MX",
		"symbol": "TSLA.MX",
		"type": "Common Stock"
	}]
...
*/

export interface searchAutoComplete {
  description: string; // second
  displaySymbol: string; //first |
  symbol: string;
  type: string;
}

export interface buySellModel {
  ticker: string;
  name: string;
  currentPrice: number;
  total: number;
}

/*
----------------------------------------------
{
	"country": "US",
	"currency": "USD",
	"exchange": "NASDAQ NMS - GLOBAL MARKET",
	"finnhubIndustry": "Automobiles",
	"ipo": "2021-11-10",
	"logo": "https://finnhub.io/api/logo?symbol=RIVN",
	"marketCapitalization": 34257.07,
	"name": "Rivian Automotive Inc",
	"phone": "18887484261.0",
	"shareOutstanding": 900.32,
	"ticker": "RIVN",
	"weburl": "https://rivian.com/"
}
*/

export interface aboutTheCompany {
  country: string;
	currency: string;
	exchange: string; // top left third above buy/sell
	finnhubIndustry: string; //second aboutTheCompany
	ipo: string; //first aboutTheCompany
	logo: string; //top middle
	marketCapitalization: string;
	name: string; //second top left below star
	phone: string;
	shareOutstanding: number;
	ticker: string //left top near star
	weburl: string; //third aboutTheCompany
}

/*
----------------------------------------------

{
	"c": 35.83, //last price
	"d": -2.22,  //change dollar value
	"dp": -5.8344, //change percentage
	"h": 37.5, //High Price
	"l": 34.9, //low price
	"o": 37.74, //Open Price
	"pc": 38.05, //Prev. Close
	"t": 1647288004 //current time unix time
}

*/

export interface stockPriceInfo {
  c: number; //top right right side logo
  d: number; //top second right right side logo
  dp: number; //top second right right side logo
  h: number; //High Price -> under summary first
  l: number; //low Price -> under summary second
  o: number; //Open Price -> under summary third
  pc: number; //Prev. Close -> under summary 4th
  t: number; //time to determine if close or open, time top right 3rd right side logo
}

/*
----------------------------------------------
[{
	"category": "company",
	"datetime": 1646087022,
	"headline": "Dow Jones Futures: Five Stocks Eyeing Buy Points In Market Rally Attempt; Lucid, Zoom Plunge On Earnings",
	"id": 104129578,
	"image": "",
	"related": "TSLA",
	"source": "Yahoo",
	"summary": "Dow Jones futures were in focus Monday, as the stock market rally attempt continues. Lucid and Zoom plunged on earnings after the close.",
	"url": "https://finnhub.io/api/news?id=ab49473453bb75dd79e5f8ce40e11420a61a068abcc8862a0957d84ea0ece2da"
}...
*/
export interface companyNewsData {
  category: string;
  datetime: number;
  time:string;
  headline: string;
  id: number;
  image: string | null;
  related: string;
  source: string;
  summary: string;
  url: string;
}

/*
----------------------------------------------

[{
	"buy": 13,
	"hold": 11,
	"period": "2022-03-01",
	"sell": 7,
	"strongBuy": 14,
	"strongSell": 4,
	"symbol": "TSLA"
}, {
	"buy": 11,
	"hold": 13,
	"period": "2022-02-01",
	"sell": 7,
	"strongBuy": 13,
	"strongSell": 4,
	"symbol": "TSLA"
}, {
	"buy": 9,
	"hold": 15,
	"period": "2022-01-01",
	"sell": 6,
	"strongBuy": 13,
	"strongSell": 4,
	"symbol": "TSLA"
}, {
	"buy": 9,
	"hold": 14,
	"period": "2021-12-01",
	"sell": 6,
	"strongBuy": 12,
	"strongSell": 4,
	"symbol": "TSLA"
}]
*/
export interface stockRecomData {
  buy: number;
	hold: number;
	period: string;
	sell: number;
	strongBuy: number;
	strongSell: number;
	symbol: number;
}

/*
----------------------------------------------
{
	"reddit": [{
		"atTime": "2022-03-09 07:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0.957401,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.957401
	}, {
		"atTime": "2022-03-09 06:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0.9864015,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.9864015
	}, {
		"atTime": "2022-03-09 05:00:00",
		"mention": 7,
		"positiveScore": 0,
		"negativeScore": 0.99646054,
		"positiveMention": 0,
		"negativeMention": 5,
		"score": -0.99646054
	}, {
		"atTime": "2022-03-09 04:00:00",
		"mention": 3,
		"positiveScore": 0.9180766,
		"negativeScore": 0.9642783,
		"positiveMention": 1,
		"negativeMention": 1,
		"score": -0.023100850000000006
	}, {
		"atTime": "2022-03-09 03:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.88786095,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.88786095
	}, {
		"atTime": "2022-03-08 20:00:00",
		"mention": 4,
		"positiveScore": 0,
		"negativeScore": 0.9307877333333333,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.9307877333333333
	}, {
		"atTime": "2022-03-08 19:00:00",
		"mention": 7,
		"positiveScore": 0.9439269,
		"negativeScore": 0.94082975,
		"positiveMention": 1,
		"negativeMention": 4,
		"score": -0.56387842
	}, {
		"atTime": "2022-03-08 18:00:00",
		"mention": 6,
		"positiveScore": 0.83834994,
		"negativeScore": 0.9797604,
		"positiveMention": 1,
		"negativeMention": 5,
		"score": -0.67674201
	}, {
		"atTime": "2022-03-08 17:00:00",
		"mention": 4,
		"positiveScore": 0,
		"negativeScore": 0.98562405,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.98562405
	}, {
		"atTime": "2022-03-08 16:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.9921461,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.9921461
	}, {
		"atTime": "2022-03-08 15:00:00",
		"mention": 12,
		"positiveScore": 0.9808019,
		"negativeScore": 0.9788679333333333,
		"positiveMention": 3,
		"negativeMention": 6,
		"score": -0.3256446555555555
	}, {
		"atTime": "2022-03-08 14:00:00",
		"mention": 12,
		"positiveScore": 0.79391645,
		"negativeScore": 0.96241665,
		"positiveMention": 2,
		"negativeMention": 2,
		"score": -0.0842501
	}, {
		"atTime": "2022-03-08 13:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-08 12:00:00",
		"mention": 5,
		"positiveScore": 0.9318104,
		"negativeScore": 0.994583,
		"positiveMention": 1,
		"negativeMention": 3,
		"score": -0.5129846499999999
	}, {
		"atTime": "2022-03-08 11:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.99966015,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.99966015
	}, {
		"atTime": "2022-03-08 10:00:00",
		"mention": 4,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-08 09:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-08 08:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0.9999583,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.9999583
	}, {
		"atTime": "2022-03-08 07:00:00",
		"mention": 4,
		"positiveScore": 0.9968671,
		"negativeScore": 0.99755377,
		"positiveMention": 1,
		"negativeMention": 1,
		"score": -0.00034333500000000017
	}, {
		"atTime": "2022-03-08 06:00:00",
		"mention": 5,
		"positiveScore": 0.9367583,
		"negativeScore": 0.9062761333333333,
		"positiveMention": 2,
		"negativeMention": 3,
		"score": -0.16906236
	}, {
		"atTime": "2022-03-08 05:00:00",
		"mention": 4,
		"positiveScore": 0.94805795,
		"negativeScore": 0.99790645,
		"positiveMention": 2,
		"negativeMention": 1,
		"score": 0.29940315
	}, {
		"atTime": "2022-03-08 04:00:00",
		"mention": 4,
		"positiveScore": 0.91957725,
		"negativeScore": 0.9999856,
		"positiveMention": 2,
		"negativeMention": 1,
		"score": 0.2797229666666667
	}, {
		"atTime": "2022-03-08 03:00:00",
		"mention": 6,
		"positiveScore": 0,
		"negativeScore": 0.93587285,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.93587285
	}, {
		"atTime": "2022-03-08 02:00:00",
		"mention": 5,
		"positiveScore": 0,
		"negativeScore": 0.9412296666666666,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.9412296666666666
	}, {
		"atTime": "2022-03-08 01:00:00",
		"mention": 6,
		"positiveScore": 0.94796866,
		"negativeScore": 0.91231395,
		"positiveMention": 1,
		"negativeMention": 4,
		"score": -0.5402574280000001
	}, {
		"atTime": "2022-03-08 00:00:00",
		"mention": 7,
		"positiveScore": 0.88940686,
		"negativeScore": 0.9297382000000001,
		"positiveMention": 1,
		"negativeMention": 3,
		"score": -0.47495193500000005
	}, {
		"atTime": "2022-03-07 23:00:00",
		"mention": 6,
		"positiveScore": 0.9616921,
		"negativeScore": 0.9938568,
		"positiveMention": 2,
		"negativeMention": 4,
		"score": -0.34200716666666664
	}, {
		"atTime": "2022-03-07 22:00:00",
		"mention": 12,
		"positiveScore": 0.9346228599999999,
		"negativeScore": 0.999282,
		"positiveMention": 5,
		"negativeMention": 3,
		"score": 0.2094085375
	}, {
		"atTime": "2022-03-07 21:00:00",
		"mention": 11,
		"positiveScore": 0,
		"negativeScore": 0.9815008888888889,
		"positiveMention": 0,
		"negativeMention": 9,
		"score": -0.9815008888888889
	}, {
		"atTime": "2022-03-07 20:00:00",
		"mention": 11,
		"positiveScore": 0.9893011,
		"negativeScore": 0.903633,
		"positiveMention": 2,
		"negativeMention": 2,
		"score": 0.04283405000000001
	}, {
		"atTime": "2022-03-07 19:00:00",
		"mention": 12,
		"positiveScore": 0.9533199,
		"negativeScore": 0,
		"positiveMention": 1,
		"negativeMention": 0,
		"score": 0.9533199
	}, {
		"atTime": "2022-03-07 18:00:00",
		"mention": 10,
		"positiveScore": 0,
		"negativeScore": 0.9877912,
		"positiveMention": 0,
		"negativeMention": 7,
		"score": -0.9877912
	}, {
		"atTime": "2022-03-07 17:00:00",
		"mention": 19,
		"positiveScore": 0.8970574,
		"negativeScore": 0.9985267,
		"positiveMention": 2,
		"negativeMention": 4,
		"score": -0.36666533333333334
	}, {
		"atTime": "2022-03-07 16:00:00",
		"mention": 6,
		"positiveScore": 0.99268144,
		"negativeScore": 0.9340228333333332,
		"positiveMention": 1,
		"negativeMention": 3,
		"score": -0.45234676499999993
	}, {
		"atTime": "2022-03-07 15:00:00",
		"mention": 3,
		"positiveScore": 0.9955354,
		"negativeScore": 0.9956768,
		"positiveMention": 1,
		"negativeMention": 1,
		"score": -0.00007070000000003462
	}, {
		"atTime": "2022-03-07 14:00:00",
		"mention": 9,
		"positiveScore": 0.9646424,
		"negativeScore": 0.9794042833333334,
		"positiveMention": 2,
		"negativeMention": 6,
		"score": -0.49339261250000005
	}, {
		"atTime": "2022-03-07 13:00:00",
		"mention": 4,
		"positiveScore": 0.9984711,
		"negativeScore": 0.91603825,
		"positiveMention": 1,
		"negativeMention": 2,
		"score": -0.2778684666666667
	}, {
		"atTime": "2022-03-07 12:00:00",
		"mention": 8,
		"positiveScore": 0.9918112666666666,
		"negativeScore": 0.9460805999999999,
		"positiveMention": 3,
		"negativeMention": 5,
		"score": -0.21937115000000001
	}, {
		"atTime": "2022-03-07 10:00:00",
		"mention": 4,
		"positiveScore": 0,
		"negativeScore": 0.926250575,
		"positiveMention": 0,
		"negativeMention": 4,
		"score": -0.926250575
	}, {
		"atTime": "2022-03-07 09:00:00",
		"mention": 4,
		"positiveScore": 0.99762696,
		"negativeScore": 0.9969167,
		"positiveMention": 1,
		"negativeMention": 2,
		"score": -0.3320688133333333
	}, {
		"atTime": "2022-03-07 08:00:00",
		"mention": 3,
		"positiveScore": 0.85852426,
		"negativeScore": 0.97226113,
		"positiveMention": 1,
		"negativeMention": 1,
		"score": -0.056868434999999995
	}, {
		"atTime": "2022-03-07 07:00:00",
		"mention": 5,
		"positiveScore": 0,
		"negativeScore": 0.9999323,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.9999323
	}, {
		"atTime": "2022-03-07 06:00:00",
		"mention": 7,
		"positiveScore": 0,
		"negativeScore": 0.9937227200000001,
		"positiveMention": 0,
		"negativeMention": 5,
		"score": -0.9937227200000001
	}, {
		"atTime": "2022-03-07 05:00:00",
		"mention": 4,
		"positiveScore": 0.7856904,
		"negativeScore": 0.9136814,
		"positiveMention": 1,
		"negativeMention": 2,
		"score": -0.3472241333333333
	}, {
		"atTime": "2022-03-07 04:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-07 03:00:00",
		"mention": 9,
		"positiveScore": 0.85740924,
		"negativeScore": 0.995026475,
		"positiveMention": 1,
		"negativeMention": 4,
		"score": -0.624539332
	}, {
		"atTime": "2022-03-07 02:00:00",
		"mention": 7,
		"positiveScore": 0.9144175,
		"negativeScore": 0.8988171,
		"positiveMention": 2,
		"negativeMention": 1,
		"score": 0.31000596666666663
	}, {
		"atTime": "2022-03-07 01:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0.995223,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.995223
	}, {
		"atTime": "2022-03-07 00:00:00",
		"mention": 5,
		"positiveScore": 0,
		"negativeScore": 0.9959271666666667,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.9959271666666667
	}, {
		"atTime": "2022-03-06 23:00:00",
		"mention": 8,
		"positiveScore": 0,
		"negativeScore": 0.9340874333333334,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.9340874333333334
	}, {
		"atTime": "2022-03-06 22:00:00",
		"mention": 9,
		"positiveScore": 0,
		"negativeScore": 0.953725,
		"positiveMention": 0,
		"negativeMention": 4,
		"score": -0.953725
	}, {
		"atTime": "2022-03-06 21:00:00",
		"mention": 10,
		"positiveScore": 0,
		"negativeScore": 0.997331,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.997331
	}, {
		"atTime": "2022-03-06 20:00:00",
		"mention": 7,
		"positiveScore": 0,
		"negativeScore": 0.9717794999999999,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.9717794999999999
	}, {
		"atTime": "2022-03-06 19:00:00",
		"mention": 3,
		"positiveScore": 0.9493985,
		"negativeScore": 0.9970566,
		"positiveMention": 1,
		"negativeMention": 1,
		"score": -0.023829049999999963
	}, {
		"atTime": "2022-03-06 17:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0.99977547,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.99977547
	}, {
		"atTime": "2022-03-06 16:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.9980726,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.9980726
	}, {
		"atTime": "2022-03-06 15:00:00",
		"mention": 2,
		"positiveScore": 0.94236404,
		"negativeScore": 0.9765024,
		"positiveMention": 1,
		"negativeMention": 1,
		"score": -0.017069180000000017
	}, {
		"atTime": "2022-03-06 11:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0.99995506,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.99995506
	}, {
		"atTime": "2022-03-06 10:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.98523235,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.98523235
	}, {
		"atTime": "2022-03-06 09:00:00",
		"mention": 2,
		"positiveScore": 0.99099684,
		"negativeScore": 0,
		"positiveMention": 1,
		"negativeMention": 0,
		"score": 0.99099684
	}, {
		"atTime": "2022-03-06 08:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-06 07:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.9927467,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.9927467
	}, {
		"atTime": "2022-03-06 06:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-06 05:00:00",
		"mention": 3,
		"positiveScore": 0.86757425,
		"negativeScore": 0.9094879,
		"positiveMention": 2,
		"negativeMention": 1,
		"score": 0.27522019999999997
	}, {
		"atTime": "2022-03-06 04:00:00",
		"mention": 3,
		"positiveScore": 0.8061712,
		"negativeScore": 0.92194855,
		"positiveMention": 1,
		"negativeMention": 2,
		"score": -0.34590863333333327
	}, {
		"atTime": "2022-03-06 03:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-06 02:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0.9742164,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.9742164
	}, {
		"atTime": "2022-03-06 00:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0.99775,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.99775
	}, {
		"atTime": "2022-03-05 23:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-05 22:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.99795555,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.99795555
	}, {
		"atTime": "2022-03-05 21:00:00",
		"mention": 5,
		"positiveScore": 0.9987832,
		"negativeScore": 0,
		"positiveMention": 1,
		"negativeMention": 0,
		"score": 0.9987832
	}, {
		"atTime": "2022-03-05 20:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-05 19:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.93532465,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.93532465
	}, {
		"atTime": "2022-03-05 18:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.97782546,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.97782546
	}, {
		"atTime": "2022-03-05 17:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0.88800126,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.88800126
	}, {
		"atTime": "2022-03-05 16:00:00",
		"mention": 4,
		"positiveScore": 0.82672757,
		"negativeScore": 0.99794395,
		"positiveMention": 1,
		"negativeMention": 2,
		"score": -0.38972011
	}, {
		"atTime": "2022-03-05 15:00:00",
		"mention": 10,
		"positiveScore": 0.94910635,
		"negativeScore": 0.9794720375,
		"positiveMention": 2,
		"negativeMention": 8,
		"score": -0.59375636
	}, {
		"atTime": "2022-03-05 14:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0.93225515,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.93225515
	}, {
		"atTime": "2022-03-05 12:00:00",
		"mention": 2,
		"positiveScore": 0,
		"negativeScore": 0.9996556,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.9996556
	}, {
		"atTime": "2022-03-05 11:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-05 09:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0.97771364,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.97771364
	}, {
		"atTime": "2022-03-05 08:00:00",
		"mention": 1,
		"positiveScore": 0,
		"negativeScore": 0,
		"positiveMention": 0,
		"negativeMention": 0,
		"score": 0
	}, {
		"atTime": "2022-03-05 07:00:00",
		"mention": 2,
		"positiveScore": 0.9981804,
		"negativeScore": 0.9805448,
		"positiveMention": 1,
		"negativeMention": 1,
		"score": 0.008817799999999987
	}, {
		"atTime": "2022-03-05 06:00:00",
		"mention": 4,
		"positiveScore": 0,
		"negativeScore": 0.9989925,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.9989925
	}, {
		"atTime": "2022-03-05 05:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0.9897169333333333,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.9897169333333333
	}, {
		"atTime": "2022-03-05 04:00:00",
		"mention": 5,
		"positiveScore": 0,
		"negativeScore": 0.9879296,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.9879296
	}, {
		"atTime": "2022-03-05 03:00:00",
		"mention": 12,
		"positiveScore": 0,
		"negativeScore": 0.9662702,
		"positiveMention": 0,
		"negativeMention": 3,
		"score": -0.9662702
	}, {
		"atTime": "2022-03-05 02:00:00",
		"mention": 4,
		"positiveScore": 0,
		"negativeScore": 0.995913,
		"positiveMention": 0,
		"negativeMention": 2,
		"score": -0.995913
	}, {
		"atTime": "2022-03-05 01:00:00",
		"mention": 4,
		"positiveScore": 0.99358485,
		"negativeScore": 0.9998041,
		"positiveMention": 2,
		"negativeMention": 1,
		"score": 0.32912186666666665
	}, {
		"atTime": "2022-03-05 00:00:00",
		"mention": 4,
		"positiveScore": 0.9915434,
		"negativeScore": 0.99985995,
		"positiveMention": 1,
		"negativeMention": 2,
		"score": -0.3360588333333334
	}, {
		"atTime": "2022-03-04 23:00:00",
		"mention": 3,
		"positiveScore": 0.84922595,
		"negativeScore": 0.99993587,
		"positiveMention": 2,
		"negativeMention": 1,
		"score": 0.2328386766666667
	}, {
		"atTime": "2022-03-04 22:00:00",
		"mention": 4,
		"positiveScore": 0.9672269,
		"negativeScore": 0.99954563,
		"positiveMention": 2,
		"negativeMention": 1,
		"score": 0.31163605666666666
	}, {
		"atTime": "2022-03-04 21:00:00",
		"mention": 5,
		"positiveScore": 0.99690264,
		"negativeScore": 0.9992981,
		"positiveMention": 1,
		"negativeMention": 3,
		"score": -0.500247915
	}, {
		"atTime": "2022-03-04 20:00:00",
		"mention": 5,
		"positiveScore": 0,
		"negativeScore": 0.95923586,
		"positiveMention": 0,
		"negativeMention": 5,
		"score": -0.95923586
	}, {
		"atTime": "2022-03-04 19:00:00",
		"mention": 3,
		"positiveScore": 0,
		"negativeScore": 0.99998605,
		"positiveMention": 0,
		"negativeMention": 1,
		"score": -0.99998605
	}, {
		"atTime": "2022-03-04 18:00:00",
		"mention": 7,
		"positiveScore": 0.9430192,
		"negativeScore": 0.9550069999999999,
		"positiveMention": 2,
		"negativeMention": 5,
		"score": -0.4127138
	}, {
		"atTime": "2022-03-04 17:00:00",
		"mention": 9,
		"positiveScore": 0.9008712666666666,
		"negativeScore": 0.9977112,
		"positiveMention": 3,
		"negativeMention": 2,
		"score": 0.14143827999999997
	}, {
		"atTime": "2022-03-04 16:00:00",
		"mention": 8,
		"positiveScore": 0.99051,
		"negativeScore": 0.9976039,
		"positiveMention": 3,
		"negativeMention": 3,
		"score": -0.0035469499999999745
	}, {
		"atTime": "2022-03-04 15:00:00",
		"mention": 7,
		"positiveScore": 0.9431927333333333,
		"negativeScore": 0.980916375,
		"positiveMention": 3,
		"negativeMention": 4,
		"score": -0.15629818571428572
	}, {
		"atTime": "2022-03-04 14:00:00",
		"mention": 5,
		"positiveScore": 0.9996351,
		"negativeScore": 0.93892225,
		"positiveMention": 1,
		"negativeMention": 2,
		"score": -0.29273646666666664
	}],
	"symbol": "tsla",
	"twitter": [{
		"atTime": "2022-03-15 03:00:00",
		"mention": 82,
		"positiveScore": 0.9640554761904762,
		"negativeScore": -0.9724409636363637,
		"positiveMention": 21,
		"negativeMention": 55,
		"score": 0.9701239210526317
	}, {
		"atTime": "2022-03-15 02:00:00",
		"mention": 113,
		"positiveScore": 0.9457306000000001,
		"negativeScore": -0.9730186764705884,
		"positiveMention": 40,
		"negativeMention": 68,
		"score": 0.9629119814814815
	}, {
		"atTime": "2022-03-15 01:00:00",
		"mention": 103,
		"positiveScore": 0.9578935517241379,
		"negativeScore": -0.9661305000000001,
		"positiveMention": 29,
		"negativeMention": 70,
		"score": 0.9637176565656567
	}, {
		"atTime": "2022-03-15 00:00:00",
		"mention": 113,
		"positiveScore": 0.9379458484848485,
		"negativeScore": -0.9667003947368421,
		"positiveMention": 33,
		"negativeMention": 76,
		"score": 0.9579948899082569
	}, {
		"atTime": "2022-03-14 23:00:00",
		"mention": 120,
		"positiveScore": 0.9529887741935484,
		"negativeScore": -0.9618666455696202,
		"positiveMention": 31,
		"negativeMention": 79,
		"score": 0.9593647000000001
	}, {
		"atTime": "2022-03-14 22:00:00",
		"mention": 132,
		"positiveScore": 0.9403534600000001,
		"negativeScore": -0.9462628169014083,
		"positiveMention": 50,
		"negativeMention": 71,
		"score": 0.9438209338842974
	}, {
		"atTime": "2022-03-14 21:00:00",
		"mention": 171,
		"positiveScore": 0.934093137254902,
		"negativeScore": -0.9634178703703704,
		"positiveMention": 51,
		"negativeMention": 108,
		"score": 0.9540118238993711
	}, {
		"atTime": "2022-03-14 20:00:00",
		"mention": 209,
		"positiveScore": 0.9571158695652173,
		"negativeScore": -0.9607444217687076,
		"positiveMention": 46,
		"negativeMention": 147,
		"score": 0.9598795854922281
	}, {
		"atTime": "2022-03-14 19:00:00",
		"mention": 214,
		"positiveScore": 0.9148015555555555,
		"negativeScore": -0.9768375862068965,
		"positiveMention": 54,
		"negativeMention": 145,
		"score": 0.960003688442211
	}, {
		"atTime": "2022-03-14 18:00:00",
		"mention": 204,
		"positiveScore": 0.9436221212121212,
		"negativeScore": -0.96740936,
		"positiveMention": 66,
		"negativeMention": 125,
		"score": 0.9591896858638743
	}, {
		"atTime": "2022-03-14 17:00:00",
		"mention": 212,
		"positiveScore": 0.9651747446808511,
		"negativeScore": -0.9725036538461538,
		"positiveMention": 47,
		"negativeMention": 156,
		"score": 0.9708068128078817
	}, {
		"atTime": "2022-03-14 16:00:00",
		"mention": 199,
		"positiveScore": 0.9362315151515151,
		"negativeScore": -0.9838183193277311,
		"positiveMention": 66,
		"negativeMention": 119,
		"score": 0.9668414054054053
	}, {
		"atTime": "2022-03-14 15:00:00",
		"mention": 229,
		"positiveScore": 0.9149542708333334,
		"negativeScore": -0.9455435975609756,
		"positiveMention": 48,
		"negativeMention": 164,
		"score": 0.938617712264151
	}, {
		"atTime": "2022-03-14 14:00:00",
		"mention": 220,
		"positiveScore": 0.9204802765957447,
		"negativeScore": -0.9524126114649683,
		"positiveMention": 47,
		"negativeMention": 157,
		"score": 0.9450556519607843
	}, {
		"atTime": "2022-03-14 13:00:00",
		"mention": 162,
		"positiveScore": 0.9412825806451613,
		"negativeScore": -0.9385615652173912,
		"positiveMention": 62,
		"negativeMention": 92,
		"score": 0.9396570389610388
	}, {
		"atTime": "2022-03-14 12:00:00",
		"mention": 244,
		"positiveScore": 0.920371076923077,
		"negativeScore": -0.9274991071428571,
		"positiveMention": 65,
		"negativeMention": 168,
		"score": 0.9255106008583691
	}, {
		"atTime": "2022-03-14 11:00:00",
		"mention": 142,
		"positiveScore": 0.9430601463414635,
		"negativeScore": -0.963815,
		"positiveMention": 41,
		"negativeMention": 98,
		"score": 0.9576930647482015
	}, {
		"atTime": "2022-03-14 10:00:00",
		"mention": 98,
		"positiveScore": 0.9519404545454545,
		"negativeScore": -0.9637885416666667,
		"positiveMention": 44,
		"negativeMention": 48,
		"score": 0.9581220652173914
	}, {
		"atTime": "2022-03-14 09:00:00",
		"mention": 142,
		"positiveScore": 0.9256502295081968,
		"negativeScore": -0.9424263815789473,
		"positiveMention": 61,
		"negativeMention": 76,
		"score": 0.9349567080291971
	}, {
		"atTime": "2022-03-14 08:00:00",
		"mention": 62,
		"positiveScore": 0.9502688,
		"negativeScore": -0.9653451162790697,
		"positiveMention": 15,
		"negativeMention": 43,
		"score": 0.9614460689655172
	}, {
		"atTime": "2022-03-14 07:00:00",
		"mention": 147,
		"positiveScore": 0.9481864255319149,
		"negativeScore": -0.929386530612245,
		"positiveMention": 47,
		"negativeMention": 98,
		"score": 0.9354802896551725
	}, {
		"atTime": "2022-03-14 06:00:00",
		"mention": 114,
		"positiveScore": 0.9601423658536585,
		"negativeScore": -0.9530632857142857,
		"positiveMention": 41,
		"negativeMention": 70,
		"score": 0.955678081081081
	}, {
		"atTime": "2022-03-14 05:00:00",
		"mention": 141,
		"positiveScore": 0.9597694,
		"negativeScore": -0.9620257831325302,
		"positiveMention": 50,
		"negativeMention": 83,
		"score": 0.9611775187969925
	}, {
		"atTime": "2022-03-14 04:00:00",
		"mention": 229,
		"positiveScore": 0.9626979333333333,
		"negativeScore": -0.9814251136363636,
		"positiveMention": 45,
		"negativeMention": 176,
		"score": 0.977611886877828
	}, {
		"atTime": "2022-03-14 03:00:00",
		"mention": 168,
		"positiveScore": 0.9651635421686747,
		"negativeScore": -0.9551629113924051,
		"positiveMention": 83,
		"negativeMention": 79,
		"score": 0.9602866913580246
	}, {
		"atTime": "2022-03-14 02:00:00",
		"mention": 181,
		"positiveScore": 0.9653020645161291,
		"negativeScore": -0.9685088732394366,
		"positiveMention": 31,
		"negativeMention": 142,
		"score": 0.9679342427745664
	}, {
		"atTime": "2022-03-14 01:00:00",
		"mention": 131,
		"positiveScore": 0.9377932307692308,
		"negativeScore": -0.9653710714285715,
		"positiveMention": 39,
		"negativeMention": 84,
		"score": 0.9566268780487805
	}, {
		"atTime": "2022-03-14 00:00:00",
		"mention": 121,
		"positiveScore": 0.9533591052631579,
		"negativeScore": -0.9569161538461538,
		"positiveMention": 38,
		"negativeMention": 78,
		"score": 0.9557509137931035
	}, {
		"atTime": "2022-03-13 23:00:00",
		"mention": 126,
		"positiveScore": 0.95289,
		"negativeScore": -0.9614109375000001,
		"positiveMention": 26,
		"negativeMention": 96,
		"score": 0.9595950000000001
	}, {
		"atTime": "2022-03-13 22:00:00",
		"mention": 173,
		"positiveScore": 0.9356264285714285,
		"negativeScore": -0.9368397894736842,
		"positiveMention": 70,
		"negativeMention": 95,
		"score": 0.9363250303030303
	}, {
		"atTime": "2022-03-13 21:00:00",
		"mention": 111,
		"positiveScore": 0.9465643103448277,
		"negativeScore": -0.8972837662337663,
		"positiveMention": 29,
		"negativeMention": 77,
		"score": 0.9107661792452831
	}, {
		"atTime": "2022-03-13 20:00:00",
		"mention": 160,
		"positiveScore": 0.9425827894736841,
		"negativeScore": -0.9125412612612612,
		"positiveMention": 38,
		"negativeMention": 111,
		"score": 0.9202028590604028
	}, {
		"atTime": "2022-03-13 19:00:00",
		"mention": 164,
		"positiveScore": 0.9520306,
		"negativeScore": -0.941568785046729,
		"positiveMention": 50,
		"negativeMention": 107,
		"score": 0.9449005732484076
	}, {
		"atTime": "2022-03-13 18:00:00",
		"mention": 102,
		"positiveScore": 0.9289864102564102,
		"negativeScore": -0.9472460344827586,
		"positiveMention": 39,
		"negativeMention": 58,
		"score": 0.9399045360824742
	}, {
		"atTime": "2022-03-13 17:00:00",
		"mention": 88,
		"positiveScore": 0.96584,
		"negativeScore": -0.9521464545454545,
		"positiveMention": 38,
		"negativeMention": 44,
		"score": 0.9584922439024389
	}, {
		"atTime": "2022-03-13 16:00:00",
		"mention": 131,
		"positiveScore": 0.9453369642857143,
		"negativeScore": -0.9568730327868853,
		"positiveMention": 56,
		"negativeMention": 61,
		"score": 0.9513514957264958
	}, {
		"atTime": "2022-03-13 15:00:00",
		"mention": 164,
		"positiveScore": 0.96794475,
		"negativeScore": -0.9640748958333334,
		"positiveMention": 56,
		"negativeMention": 96,
		"score": 0.9655006315789475
	}, {
		"atTime": "2022-03-13 14:00:00",
		"mention": 127,
		"positiveScore": 0.9495934528301887,
		"negativeScore": -0.9578033787878788,
		"positiveMention": 53,
		"negativeMention": 66,
		"score": 0.9541468571428571
	}, {
		"atTime": "2022-03-13 13:00:00",
		"mention": 113,
		"positiveScore": 0.953492340425532,
		"negativeScore": -0.9772427166666666,
		"positiveMention": 47,
		"negativeMention": 60,
		"score": 0.966810308411215
	}, {
		"atTime": "2022-03-13 12:00:00",
		"mention": 70,
		"positiveScore": 0.950276962962963,
		"negativeScore": -0.9659777777777777,
		"positiveMention": 27,
		"negativeMention": 36,
		"score": 0.9592488571428571
	}, {
		"atTime": "2022-03-13 11:00:00",
		"mention": 38,
		"positiveScore": 0.90495015,
		"negativeScore": -0.9726385294117648,
		"positiveMention": 20,
		"negativeMention": 17,
		"score": 0.9360502162162163
	}, {
		"atTime": "2022-03-13 10:00:00",
		"mention": 45,
		"positiveScore": 0.92733145,
		"negativeScore": -0.96032432,
		"positiveMention": 20,
		"negativeMention": 25,
		"score": 0.9456608222222223
	}, {
		"atTime": "2022-03-13 09:00:00",
		"mention": 30,
		"positiveScore": 0.9771845,
		"negativeScore": -0.9196804761904761,
		"positiveMention": 8,
		"negativeMention": 21,
		"score": 0.9355436551724137
	}, {
		"atTime": "2022-03-13 08:00:00",
		"mention": 44,
		"positiveScore": 0.9186074999999999,
		"negativeScore": -0.9209365,
		"positiveMention": 24,
		"negativeMention": 18,
		"score": 0.9196056428571427
	}, {
		"atTime": "2022-03-13 07:00:00",
		"mention": 42,
		"positiveScore": 0.9732172962962963,
		"negativeScore": -0.9873319090909092,
		"positiveMention": 27,
		"negativeMention": 11,
		"score": 0.9773031052631579
	}, {
		"atTime": "2022-03-13 06:00:00",
		"mention": 61,
		"positiveScore": 0.9584512,
		"negativeScore": -0.9666377575757575,
		"positiveMention": 25,
		"negativeMention": 33,
		"score": 0.9631090689655173
	}, {
		"atTime": "2022-03-13 05:00:00",
		"mention": 44,
		"positiveScore": 0.9061455555555555,
		"negativeScore": -0.9816211034482759,
		"positiveMention": 9,
		"negativeMention": 29,
		"score": 0.9637453157894736
	}, {
		"atTime": "2022-03-13 04:00:00",
		"mention": 54,
		"positiveScore": 0.9372596842105263,
		"negativeScore": -0.95694321875,
		"positiveMention": 19,
		"negativeMention": 32,
		"score": 0.9496101372549018
	}, {
		"atTime": "2022-03-13 03:00:00",
		"mention": 39,
		"positiveScore": 0.9631235,
		"negativeScore": -0.9401351818181819,
		"positiveMention": 14,
		"negativeMention": 22,
		"score": 0.9490750833333332
	}, {
		"atTime": "2022-03-13 02:00:00",
		"mention": 83,
		"positiveScore": 0.9194960799999999,
		"negativeScore": -0.9714616981132076,
		"positiveMention": 25,
		"negativeMention": 53,
		"score": 0.9548060512820513
	}, {
		"atTime": "2022-03-13 01:00:00",
		"mention": 50,
		"positiveScore": 0.9055937692307693,
		"negativeScore": -0.9704615588235295,
		"positiveMention": 13,
		"negativeMention": 34,
		"score": 0.9525194042553192
	}, {
		"atTime": "2022-03-13 00:00:00",
		"mention": 72,
		"positiveScore": 0.9717685,
		"negativeScore": -0.945116590909091,
		"positiveMention": 16,
		"negativeMention": 44,
		"score": 0.9522237666666666
	}, {
		"atTime": "2022-03-12 23:00:00",
		"mention": 61,
		"positiveScore": 0.9314245,
		"negativeScore": -0.9823611702127659,
		"positiveMention": 10,
		"negativeMention": 47,
		"score": 0.9734249122807017
	}, {
		"atTime": "2022-03-12 22:00:00",
		"mention": 78,
		"positiveScore": 0.8838955263157896,
		"negativeScore": -0.9699482162162162,
		"positiveMention": 38,
		"negativeMention": 37,
		"score": 0.9263481866666666
	}, {
		"atTime": "2022-03-12 21:00:00",
		"mention": 88,
		"positiveScore": 0.9649254736842104,
		"negativeScore": -0.9481375744680851,
		"positiveMention": 38,
		"negativeMention": 47,
		"score": 0.9556427529411765
	}, {
		"atTime": "2022-03-12 20:00:00",
		"mention": 101,
		"positiveScore": 0.9260229655172414,
		"negativeScore": -0.964082205882353,
		"positiveMention": 29,
		"negativeMention": 68,
		"score": 0.9527036701030929
	}, {
		"atTime": "2022-03-12 19:00:00",
		"mention": 116,
		"positiveScore": 0.9566307027027027,
		"negativeScore": -0.962492191780822,
		"positiveMention": 37,
		"negativeMention": 73,
		"score": 0.9605206000000001
	}, {
		"atTime": "2022-03-12 18:00:00",
		"mention": 99,
		"positiveScore": 0.9466946551724138,
		"negativeScore": -0.9627433823529411,
		"positiveMention": 29,
		"negativeMention": 68,
		"score": 0.9579453092783504
	}, {
		"atTime": "2022-03-12 17:00:00",
		"mention": 118,
		"positiveScore": 0.9001409722222221,
		"negativeScore": -0.9679623076923076,
		"positiveMention": 36,
		"negativeMention": 78,
		"score": 0.9465450438596491
	}, {
		"atTime": "2022-03-12 16:00:00",
		"mention": 115,
		"positiveScore": 0.9272416382978723,
		"negativeScore": -0.9782233333333333,
		"positiveMention": 47,
		"negativeMention": 63,
		"score": 0.9564402454545454
	}, {
		"atTime": "2022-03-12 15:00:00",
		"mention": 110,
		"positiveScore": 0.9169466,
		"negativeScore": -0.9560860655737705,
		"positiveMention": 40,
		"negativeMention": 61,
		"score": 0.9405852871287128
	}, {
		"atTime": "2022-03-12 14:00:00",
		"mention": 90,
		"positiveScore": 0.9652063333333333,
		"negativeScore": -0.9666871153846154,
		"positiveMention": 30,
		"negativeMention": 52,
		"score": 0.9661453658536584
	}, {
		"atTime": "2022-03-12 13:00:00",
		"mention": 63,
		"positiveScore": 0.9469458181818182,
		"negativeScore": -0.9367207407407407,
		"positiveMention": 33,
		"negativeMention": 27,
		"score": 0.9423445333333333
	}, {
		"atTime": "2022-03-12 12:00:00",
		"mention": 59,
		"positiveScore": 0.9501655217391304,
		"negativeScore": -0.9357776774193549,
		"positiveMention": 23,
		"negativeMention": 31,
		"score": 0.9419058333333333
	}, {
		"atTime": "2022-03-12 11:00:00",
		"mention": 34,
		"positiveScore": 0.94359625,
		"negativeScore": -0.9904315,
		"positiveMention": 20,
		"negativeMention": 12,
		"score": 0.96115946875
	}, {
		"atTime": "2022-03-12 10:00:00",
		"mention": 28,
		"positiveScore": 0.9321460769230769,
		"negativeScore": -0.9937943846153845,
		"positiveMention": 13,
		"negativeMention": 13,
		"score": 0.9629702307692306
	}, {
		"atTime": "2022-03-12 09:00:00",
		"mention": 44,
		"positiveScore": 0.9730996153846154,
		"negativeScore": -0.951224,
		"positiveMention": 13,
		"negativeMention": 30,
		"score": 0.957837558139535
	}, {
		"atTime": "2022-03-12 08:00:00",
		"mention": 25,
		"positiveScore": 0.9637732,
		"negativeScore": -0.935957,
		"positiveMention": 10,
		"negativeMention": 13,
		"score": 0.948051
	}, {
		"atTime": "2022-03-12 07:00:00",
		"mention": 33,
		"positiveScore": 0.9857281333333333,
		"negativeScore": -0.9542633333333332,
		"positiveMention": 15,
		"negativeMention": 18,
		"score": 0.9685655151515151
	}, {
		"atTime": "2022-03-12 06:00:00",
		"mention": 44,
		"positiveScore": 0.9191819444444445,
		"negativeScore": -0.96768592,
		"positiveMention": 18,
		"negativeMention": 25,
		"score": 0.9473819302325581
	}, {
		"atTime": "2022-03-12 05:00:00",
		"mention": 62,
		"positiveScore": 0.9594125833333332,
		"negativeScore": -0.9606618235294119,
		"positiveMention": 24,
		"negativeMention": 34,
		"score": 0.9601448965517242
	}, {
		"atTime": "2022-03-12 04:00:00",
		"mention": 87,
		"positiveScore": 0.9281015294117647,
		"negativeScore": -0.9285947692307692,
		"positiveMention": 17,
		"negativeMention": 65,
		"score": 0.928492512195122
	}, {
		"atTime": "2022-03-12 03:00:00",
		"mention": 84,
		"positiveScore": 0.9642351724137931,
		"negativeScore": -0.9466707755102041,
		"positiveMention": 29,
		"negativeMention": 49,
		"score": 0.9532011282051283
	}, {
		"atTime": "2022-03-12 02:00:00",
		"mention": 96,
		"positiveScore": 0.9687456666666667,
		"negativeScore": -0.9214198181818182,
		"positiveMention": 36,
		"negativeMention": 55,
		"score": 0.9401421318681318
	}, {
		"atTime": "2022-03-12 01:00:00",
		"mention": 114,
		"positiveScore": 0.9445258222222221,
		"negativeScore": -0.9444753968253968,
		"positiveMention": 45,
		"negativeMention": 63,
		"score": 0.9444964074074074
	}, {
		"atTime": "2022-03-12 00:00:00",
		"mention": 83,
		"positiveScore": 0.9559862424242425,
		"negativeScore": -0.950905659574468,
		"positiveMention": 33,
		"negativeMention": 47,
		"score": 0.9530014
	}, {
		"atTime": "2022-03-11 23:00:00",
		"mention": 122,
		"positiveScore": 0.9332095652173912,
		"negativeScore": -0.9506864285714286,
		"positiveMention": 46,
		"negativeMention": 70,
		"score": 0.9437559482758621
	}, {
		"atTime": "2022-03-11 22:00:00",
		"mention": 157,
		"positiveScore": 0.9746980579710145,
		"negativeScore": -0.9310141463414634,
		"positiveMention": 69,
		"negativeMention": 82,
		"score": 0.9509756688741723
	}, {
		"atTime": "2022-03-11 21:00:00",
		"mention": 189,
		"positiveScore": 0.9413286363636364,
		"negativeScore": -0.9399156989247311,
		"positiveMention": 88,
		"negativeMention": 93,
		"score": 0.9406026519337016
	}, {
		"atTime": "2022-03-11 20:00:00",
		"mention": 249,
		"positiveScore": 0.9211335949367089,
		"negativeScore": -0.950271,
		"positiveMention": 79,
		"negativeMention": 150,
		"score": 0.940219231441048
	}, {
		"atTime": "2022-03-11 19:00:00",
		"mention": 243,
		"positiveScore": 0.9174846575342467,
		"negativeScore": -0.9217166225165564,
		"positiveMention": 73,
		"negativeMention": 151,
		"score": 0.920337455357143
	}, {
		"atTime": "2022-03-11 18:00:00",
		"mention": 344,
		"positiveScore": 0.9074566379310345,
		"negativeScore": -0.9401045812807881,
		"positiveMention": 116,
		"negativeMention": 203,
		"score": 0.9282326018808778
	}, {
		"atTime": "2022-03-11 17:00:00",
		"mention": 285,
		"positiveScore": 0.9312954339622641,
		"negativeScore": -0.951159512195122,
		"positiveMention": 106,
		"negativeMention": 164,
		"score": 0.9433610222222222
	}, {
		"atTime": "2022-03-11 16:00:00",
		"mention": 273,
		"positiveScore": 0.9247051999999999,
		"negativeScore": -0.9480739072847683,
		"positiveMention": 100,
		"negativeMention": 151,
		"score": 0.9387636653386454
	}, {
		"atTime": "2022-03-11 15:00:00",
		"mention": 233,
		"positiveScore": 0.9337074999999999,
		"negativeScore": -0.9589916296296295,
		"positiveMention": 78,
		"negativeMention": 135,
		"score": 0.9497326525821596
	}, {
		"atTime": "2022-03-11 14:00:00",
		"mention": 216,
		"positiveScore": 0.9523843333333334,
		"negativeScore": -0.9357482300884955,
		"positiveMention": 90,
		"negativeMention": 113,
		"score": 0.943123842364532
	}, {
		"atTime": "2022-03-11 13:00:00",
		"mention": 185,
		"positiveScore": 0.9619079411764706,
		"negativeScore": -0.9323478301886792,
		"positiveMention": 68,
		"negativeMention": 106,
		"score": 0.9439000574712644
	}, {
		"atTime": "2022-03-11 12:00:00",
		"mention": 117,
		"positiveScore": 0.93603425,
		"negativeScore": -0.9051224358974358,
		"positiveMention": 32,
		"negativeMention": 78,
		"score": 0.9141149636363636
	}, {
		"atTime": "2022-03-11 11:00:00",
		"mention": 93,
		"positiveScore": 0.9514213125,
		"negativeScore": -0.9315410357142857,
		"positiveMention": 32,
		"negativeMention": 56,
		"score": 0.9387702272727272
	}, {
		"atTime": "2022-03-11 10:00:00",
		"mention": 66,
		"positiveScore": 0.9496471034482759,
		"negativeScore": -0.9696984827586207,
		"positiveMention": 29,
		"negativeMention": 29,
		"score": 0.9596727931034483
	}, {
		"atTime": "2022-03-11 09:00:00",
		"mention": 69,
		"positiveScore": 0.9438339166666667,
		"negativeScore": -0.9865514285714286,
		"positiveMention": 24,
		"negativeMention": 42,
		"score": 0.9710177878787879
	}, {
		"atTime": "2022-03-11 08:00:00",
		"mention": 47,
		"positiveScore": 0.9181306666666667,
		"negativeScore": -0.9778044074074074,
		"positiveMention": 18,
		"negativeMention": 27,
		"score": 0.9539349111111111
	}, {
		"atTime": "2022-03-11 07:00:00",
		"mention": 95,
		"positiveScore": 0.9182024166666666,
		"negativeScore": -0.9601195454545455,
		"positiveMention": 24,
		"negativeMention": 66,
		"score": 0.9489416444444444
	}, {
		"atTime": "2022-03-11 06:00:00",
		"mention": 84,
		"positiveScore": 0.9733431904761906,
		"negativeScore": -0.9601625172413792,
		"positiveMention": 21,
		"negativeMention": 58,
		"score": 0.9636662405063291
	}, {
		"atTime": "2022-03-11 05:00:00",
		"mention": 90,
		"positiveScore": 0.9673429166666667,
		"negativeScore": -0.9787166666666667,
		"positiveMention": 36,
		"negativeMention": 48,
		"score": 0.9738422023809524
	}, {
		"atTime": "2022-03-11 04:00:00",
		"mention": 122,
		"positiveScore": 0.958076046511628,
		"negativeScore": -0.9631159027777778,
		"positiveMention": 43,
		"negativeMention": 72,
		"score": 0.9612314347826088
	}, {
		"atTime": "2022-03-11 03:00:00",
		"mention": 83,
		"positiveScore": 0.9422888695652173,
		"negativeScore": -0.9727411764705882,
		"positiveMention": 23,
		"negativeMention": 51,
		"score": 0.9632762702702703
	}, {
		"atTime": "2022-03-11 02:00:00",
		"mention": 109,
		"positiveScore": 0.9460157241379311,
		"negativeScore": -0.939869208955224,
		"positiveMention": 29,
		"negativeMention": 67,
		"score": 0.94172596875
	}, {
		"atTime": "2022-03-11 01:00:00",
		"mention": 138,
		"positiveScore": 0.9357302777777777,
		"negativeScore": -0.9580544680851063,
		"positiveMention": 36,
		"negativeMention": 94,
		"score": 0.9518723846153846
	}, {
		"atTime": "2022-03-11 00:00:00",
		"mention": 159,
		"positiveScore": 0.931412105263158,
		"negativeScore": -0.9736154545454546,
		"positiveMention": 57,
		"negativeMention": 88,
		"score": 0.9570251724137931
	}]
}
*/

export interface companySocialSentimentData {
  atTime: string;
  mention: number;
  positiveScore: number;
  negativeScore: number;
  positiveMention: number;
  negativeMention: number;
  score: number;
}

/*
----------------------------------------------

[{
	"actual": 2.54,
	"estimate": 2.418,
	"period": "2021-12-31",
	"surprise": 0.122,
	"surprisePercent": 5.0455,
	"symbol": "TSLA"
}, {
	"actual": 1.86,
	"estimate": 1.626,
	"period": "2021-09-30",
	"surprise": 0.234,
	"surprisePercent": 14.3911,
	"symbol": "TSLA"
}, {
	"actual": 1.45,
	"estimate": 1.0013,
	"period": "2021-06-30",
	"surprise": 0.4487,
	"surprisePercent": 44.8117,
	"symbol": "TSLA"
}, {
	"actual": 0.93,
	"estimate": 0.8055,
	"period": "2021-03-31",
	"surprise": 0.1245,
	"surprisePercent": 15.4562,
	"symbol": "TSLA"
}]
*/

export interface companyEarningData {
  actual: number;
	estimate: number;
	period: string;
	surprise: number;
	surprisePercent: number;
	symbol: string;
}



/*
----------------------------------------------
{
  "c":[861,...],
  "h":[865,...],
  "l":[860,..],
  "o":[860,...],
  "s": "ok",
  "t":[1646211600,...],
  "v":[0,...],
}
*/

export interface companyHistoricalData {
    c: number[];
    h: number[];
    l: number[];
    o: number[];
    s: string;
    t: number[];
    v: number[];
}

/*
----------------------------------------------
{
	"CompanyPeersArray": ["TSLA", "F", "GM", "LCID", "RIVN", "THO", "FSR", "WGO", "FFIE", "GOEV"]
}
*/

/*
export interface companyPeersArrayData{
     CompanyPeersArray: string[];
 }
 */

 export interface companyPeersArrayData{
      item: string;
      weburl: string;
  }
