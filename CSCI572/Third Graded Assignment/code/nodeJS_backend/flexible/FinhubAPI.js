//https://node-postgres.com/guides/async-express
//https://stackoverflow.com/questions/40227087/get-data-from-express-with-fetch
//https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808

/*
installed pkgs
https://www.npmjs.com/package/express-async-await
https://www.npmjs.com/package/cors
*/

const urlModule = require('url');
const httpsModule = require('https');
const asynchronousModule = require('express-async-await');
const fetchModule = require('node-fetch');
const myAPIToken = 'c7rgofaad3iel5ub9hrg' //https://ehsankhalighstock1.wm.r.appspot.com
//const myAPIToken =  "c9iro92ad3iblk5ag270" // https://ehsankhalighstock0.wm.r.appspot.com
//const myAPIToken = 'c9oq932ad3idb416lun0' // https://ehsankhalighstock.uw.r.appspot.com


//https://stackoverflow.com/questions/33865068/typeerror-is-not-a-function-in-node-js
module.exports.finhubCompanyDescriptionAPICall = finhubCompanyDescriptionAPICall;
module.exports.finhubCompanyHistoricalDataAPICall = finhubCompanyHistoricalDataAPICall;
module.exports.finhubCompanyHistoricalDataSummaryTabAPICall = finhubCompanyHistoricalDataSummaryTabAPICall;
module.exports.finhubAutocompleteAPICall = finhubAutocompleteAPICall;
module.exports.finhubCompanyNewsAPICall = finhubCompanyNewsAPICall;
module.exports.finhubCompanyRecommendationTrendsAPICall =  finhubCompanyRecommendationTrendsAPICall;
module.exports.finhubCompanySocialSentimentAPICall =  finhubCompanySocialSentimentAPICall;
module.exports.finhubCompanyPeersAPICall = finhubCompanyPeersAPICall;
module.exports.finhubCompanyEarningsAPICall = finhubCompanyEarningsAPICall;
module.exports.finhubCompanyLatestPriceofStockAPICall = finhubCompanyLatestPriceofStockAPICall;

async function finhubCompanyDescriptionAPICall(ticker) {
    //https://finnhub.io/api/v1/stock/profile2?symbol=<TICKER>&token=<API_Key >
    //https://finnhub.io/api/v1/stock/profile2?symbol=intc&token=c7rgofaad3iel5ub9hrg
  try {
      let definedAPIendpointURL = "https://finnhub.io/api/v1/stock/profile2?symbol="+ticker+"&token="+myAPIToken;
      console.log("finhubCompanyDescriptionAPICall");
      console.log(definedAPIendpointURL);
      console.log("------------------------");
      let jsonHeader = {'Content-Type': 'application/json'};
      let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
      let returnJson = await fetchCall.json();

      if(returnJson["error"]){ /** will return its value if exist */
        return [];
      }

      return returnJson;
  } catch (err) {
        console.log("Error finhubCompanyDescriptionAPICall")
        return [];
  }
}

async function finhubCompanyHistoricalDataSummaryTabAPICall(ticker, fromUnixTime, toUnixTime) {
    //pay attention to resolution later
    //resolution -> Supported resolution includes 1, 5, 15, 30, 60, D, W, M .Some timeframes might not be available depending on the exchange.
    //https://finnhub.io/api/v1/stock/candle?symbol=<TICKER>&resolution=<TIMEINTERV AL>&from=<UNIX_TIMESTAMP>&to=<UNIX_TIMESTAMP>1631627048&token= <API_KEY>
    //https://finnhub.io/api/v1/stock/candle?symbol=tsla&resolution=1&from=1646199163&to=1646458363&token=c7rgofaad3iel5ub9hrg
    //https://finnhub.io/api/v1/stock/candle?symbol=IBM&resolution=D&from=1572651390&to=1575243390
    /*
    1: one Minute
    5: 5 minutes
    15: every 15 minutes
    30: every 30 minutes
    60: every hour
    D: every day
    M: every month
    */
    try {
        let definedAPIendpointURL = "https://finnhub.io/api/v1/stock/candle?symbol=" + ticker + "&resolution=60&from=" + fromUnixTime + "&to=" + toUnixTime + "&token=" + myAPIToken;
        console.log("finhubCompanyHistoricalDataSummaryTabAPICall");
        console.log(definedAPIendpointURL);
        console.log("------------------------");
        let jsonHeader = {'Content-Type': 'application/json'};
        let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
        let returnJson = await fetchCall.json();

        if(returnJson["error"]){ /** will return its value if exist */
          return [];
        }

        return returnJson;
    } catch (err) {
          console.log("Error finhubCompanyHistoricalDataSummaryTabAPICall")
          return [];
    }
}

async function finhubCompanyHistoricalDataAPICall(ticker, fromUnixTime, toUnixTime) {
    //pay attention to resolution later
    //resolution -> Supported resolution includes 1, 5, 15, 30, 60, D, W, M .Some timeframes might not be available depending on the exchange.
    //https://finnhub.io/api/v1/stock/candle?symbol=<TICKER>&resolution=<TIMEINTERV AL>&from=<UNIX_TIMESTAMP>&to=<UNIX_TIMESTAMP>1631627048&token= <API_KEY>
    //https://finnhub.io/api/v1/stock/candle?symbol=tsla&resolution=1&from=1646199163&to=1646458363&token=c7rgofaad3iel5ub9hrg
    /*
    1: one Minute
    5: 5 minutes
    15: every 15 minutes
    30: every 30 minutes
    60: every hour
    D: every day
    M: every month
    */
    try {
        let definedAPIendpointURL = "https://finnhub.io/api/v1/stock/candle?symbol=" + ticker + "&resolution=D&from=" + fromUnixTime + "&to=" + toUnixTime + "&token=" + myAPIToken;
        console.log("finhubCompanyHistoricalDataAPICall");
        console.log(definedAPIendpointURL);
        console.log("------------------------");
        let jsonHeader = {'Content-Type': 'application/json'};
        let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
        let returnJson = await fetchCall.json();

        if(returnJson["error"]){ /** will return its value if exist */
          return [];
        }

        return returnJson;
    } catch (err) {
          console.log("Error finhubCompanyHistoricalDataAPICall")
          return [];
    }
}

async function finhubCompanyLatestPriceofStockAPICall(ticker) {
    //https://finnhub.io/api/v1/quote?symbol=<TICKER>&token=<API_KEY>
    //https://finnhub.io/api/v1/quote?symbol=tsla&token=c7rgofaad3iel5ub9hrg
    try {
        let definedAPIendpointURL = "https://finnhub.io/api/v1/quote?symbol=" + ticker + "&token=" + myAPIToken;
        console.log("finhubCompanyLatestPriceofStockAPICall");
        console.log(definedAPIendpointURL);
        console.log("------------------------");
        let jsonHeader = {'Content-Type': 'application/json'};
        let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
        let returnJson = await fetchCall.json();

        if(returnJson["error"]){ /** will return its value if exist */
          return [];
        }

        return returnJson;
    } catch (err) {
          console.log("Error finhubCompanyLatestPriceofStockAPICall")
          return [];
    }
}

async function finhubAutocompleteAPICall(ticker) {
    //https://finnhub.io/api/v1/search?q=<QUERY>&token=<API_KEY>
    //https://finnhub.io/api/v1/search?q=a&token=c7rgofaad3iel5ub9hrg
    try {
        let definedAPIendpointURL = "https://finnhub.io/api/v1/search?q=" + ticker + "&token=" + myAPIToken;
        console.log("finhubAutocompleteAPICall");
        console.log(definedAPIendpointURL);
        console.log("------------------------");
        let jsonHeader = {'Content-Type': 'application/json'};
        let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
        let returnJson = await fetchCall.json();
        return returnJson["result"];

        if(returnJson["error"]){ /** will return its value if exist */
          return [];
        }

    } catch (err) {
          console.log("Error finhubAutocompleteAPICall")
          return [];
    }

}

async function finhubCompanyNewsAPICall(ticker, from_yyyy_mm_dd, to_yyyy_mm_dd) {
    //https://finnhub.io/api/v1/company-%20news?symbol=%3CTICKER%3E&from=%3CDA%20TE%3E&to=%3CDA%20TE%3E&token=%3CAPI_KEY%3E
    //https://finnhub.io/api/v1/company-news?symbol=MSFT&from=2021-09-01&to=2021-09-09&token=c7rgofaad3iel5ub9hrg
    try {
        let definedAPIendpointURL = "https://finnhub.io/api/v1/company-news?symbol=" + ticker + "&from=" + from_yyyy_mm_dd + "&to=" + to_yyyy_mm_dd + "&token=" + myAPIToken;
        console.log("finhubCompanyNewsAPICall");
        console.log(definedAPIendpointURL);
        console.log("------------------------");
        let jsonHeader = {'Content-Type': 'application/json'};
        let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
        let returnJson = await fetchCall.json();

        if(returnJson["error"]){ /** will return its value if exist */
          return [];
        }

        return returnJson;
    } catch (err) {
             console.log("Error finhubCompanyNewsAPICall")
             return [];
    }
}

async function finhubCompanyRecommendationTrendsAPICall(ticker) {
    //https://finnhub.io/api/v1/stock/recommendation?symbol=<TICKER>&token=<API_KEY>
    //https://finnhub.io/api/v1/stock/recommendation?symbol=tsla&token=c7rgofaad3iel5ub9hrg
    try {
        let definedAPIendpointURL = "https://finnhub.io/api/v1/stock/recommendation?symbol=" + ticker + "&token=" + myAPIToken;
        console.log("finhubCompanyRecommendationTrendsAPICall");
        console.log(definedAPIendpointURL);
        console.log("------------------------");
        let jsonHeader = {'Content-Type': 'application/json'};
        let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
        let returnJson = await fetchCall.json();

        if(returnJson["error"]){ /** will return its value if exist */
          return [];
        }

        return returnJson;
   } catch (err) {
          console.log("Error finhubCompanyRecommendationTrendsAPICall")
          return [];
   }
}

async function finhubCompanySocialSentimentAPICall(ticker) {
    //https://finnhub.io/api/v1/stock/social-sentiment?symbol=<TICKER>&from=2022-01-01&token=<API_KEY>
    //https://finnhub.io/api/v1/stock/social-sentiment?symbol=tsla&from=2022-01-01&token=c7rgofaad3iel5ub9hrg
    //NOTE: ‘from=2022-01-01’ should be used as a default parameter while using company’s social sentiment API calls, if not used can sometime return empty response.
    try {
      let definedAPIendpointURL = "https://finnhub.io/api/v1/stock/social-sentiment?symbol=" + ticker + "&from=2022-01-01&token=" + myAPIToken;
      console.log("finhubCompanySocialSentimentAPICall");
      console.log(definedAPIendpointURL);
      console.log("------------------------");
      let jsonHeader = {'Content-Type': 'application/json'};
      let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
      let returnJson = await fetchCall.json();

      if(returnJson["error"]){ /** will return its value if exist */
        return [];
      }

      return returnJson;
    } catch (err) {
          console.log("Error finhubCompanySocialSentimentAPICall")
          return [];
    }

}

async function finhubCompanyPeersAPICall(ticker) {
    //https://finnhub.io/api/v1/stock/peers?symbol=<TICKER>&token=<API_KEY>
    //https://finnhub.io/api/v1/stock/peers?symbol=tsla&token=c7rgofaad3iel5ub9hrg
  try {
      let definedAPIendpointURL = "https://finnhub.io/api/v1/stock/peers?symbol=" + ticker + "&token=" + myAPIToken;
      console.log("finhubCompanyPeersAPICall");
      console.log(definedAPIendpointURL);
      console.log("------------------------");
      let jsonHeader = {'Content-Type': 'application/json'};
      let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
      let returnJson = await fetchCall.json();

      console.log("returnJson:",returnJson)

      var finalJson = [];
      for (let i = 0; i < returnJson.length; i += 1) {
          let ticker1 = returnJson[i];
          let definedAPIendpointURL1 = "https://finnhub.io/api/v1/stock/profile2?symbol="+ticker1+"&token="+myAPIToken;
          let jsonHeader1 = {'Content-Type': 'application/json'};
          let fetchCall1 = await fetchModule(definedAPIendpointURL1, {method: 'GET', headers: jsonHeader1});
          let returnJson1 = await fetchCall1.json();
          let companyURL = returnJson1['weburl'];
          finalJson.push({item: returnJson[i], weburl: companyURL});
      }
      //console.log("after data:", data)
      //return_json = {"CompanyPeersArray": finalJson};
      //return_json = {"CompanyPeersArray": finalJson};

      if(finalJson["error"]){ /** will return its value if exist */
        return [];
      }

      return finalJson;

  } catch (err) {
        console.log("Error finhubCompanyPeersAPICall")
        return [];
  }
}

async function finhubCompanyEarningsAPICall(ticker) {
    //https://finnhub.io/api/v1/stock/earnings?symbol=<TICKER>&token=<API_KEY>
    //https://finnhub.io/api/v1/stock/earnings?symbol=tsla&token=c7rgofaad3iel5ub9hrg
  try {
        let definedAPIendpointURL = "https://finnhub.io/api/v1/stock/earnings?symbol=" + ticker + "&token=" + myAPIToken;
        console.log("finhubCompanyEarningsAPICall");
        console.log(definedAPIendpointURL);
        console.log("------------------------");
        let jsonHeader = {'Content-Type': 'application/json'};
        let fetchCall = await fetchModule(definedAPIendpointURL, {method: 'GET', headers: jsonHeader});
        let returnJson = await fetchCall.json();

        if(returnJson["error"]){ /** will return its value if exist */
          return [];
        }

        return returnJson;
  } catch (err) {
        console.log("Error finhubCompanyEarningsAPICall")
        return [];
  }
}
