// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//'use strict';

// [START gae_flex_quickstart]
const cors = require('cors');
const express = require('express');
const FinhubAPI = require('./FinhubAPI.js');
const app = express();

//orginal template
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).send('csci571 HW8').end();
});

//endPoints
app.get('/api/v0/CompanyDescription/:ticker', async function (req, res) {
    let finRequest = await FinhubAPI.finhubCompanyDescriptionAPICall(req.params.ticker);
    return res.send(finRequest);
})

app.get('/api/v0/CompanyHistoricalData/:ticker', async function (req, res) {

    //let fromUnixTime="1646199163"; //testing
    //let toUnixTime="1646458363"; //testing
    let toUnixTime = Math.round(new Date().getTime() / 1000).toString();
    let past365 = new Date((new Date()).valueOf() - 1000*60*60*24*365);
    let fromUnixTime = Math.round(new Date(past365).getTime() / 1000).toString();

    console.log("fromUnixTime:", fromUnixTime);
    console.log("toUnixTime:", toUnixTime);

    let finRequest = await FinhubAPI.finhubCompanyHistoricalDataAPICall(req.params.ticker, fromUnixTime, toUnixTime);
    return res.send(finRequest);
})

app.get('/api/v0/CompanyHistoricalDataSummary/:ticker', async function (req, res) {

    //let fromUnixTime="1646199163"; //testing
    //let toUnixTime="1646458363"; //testing
    let toUnixTime = Math.round(new Date().getTime() / 1000).toString();
    let past365 = new Date((new Date()).valueOf() - 1000*60*60*24*3);
    let fromUnixTime = Math.round(new Date(past365).getTime() / 1000).toString();

    console.log("fromUnixTime:", fromUnixTime);
    console.log("toUnixTime:", toUnixTime);

    let finRequest = await FinhubAPI.finhubCompanyHistoricalDataSummaryTabAPICall(req.params.ticker, fromUnixTime, toUnixTime);
    return res.send(finRequest);
})

app.get('/api/v0/CompanyLatestPriceofStock/:ticker', async function (req, res) {
    let finRequest = await FinhubAPI.finhubCompanyLatestPriceofStockAPICall(req.params.ticker);
    return res.send(finRequest);
})

app.get('/api/v0/Autocomplete/:ticker', async function (req, res) {
    let finRequest = await FinhubAPI.finhubAutocompleteAPICall(req.params.ticker);
    return res.send(finRequest);
})

app.get('/api/v0/CompanyNews/:ticker', async function (req, res) {
    //change later
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    var today1 = new Date();
    console.log("1.......");
    today1.setDate(today1.getDate() - 30);
    let dd1 = String(today1.getDate()).padStart(2, '0');
    let mm1 = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy1 = today1.getFullYear();

    to_yyyy_mm_dd = yyyy + "-" + mm + "-" + dd;
    from_yyyy_mm_dd = yyyy1 + "-" + mm1 + "-" + dd1;
    //let from_yyyy_mm_dd = "2022-02-01";
    //let to_yyyy_mm_dd = "2022-02-28";
    //console.log("from_yyyy_mm_dd:"+from_yyyy_mm_dd)
    //console.log("to_yyyy_mm_dd:"+to_yyyy_mm_dd)
    let finRequest = await FinhubAPI.finhubCompanyNewsAPICall(req.params.ticker, from_yyyy_mm_dd, to_yyyy_mm_dd);
    //console.log(finRequest[0])
    let count = 0;
    let cleaned_json = [];

    for (let item in finRequest) {
          //console.log(finRequest[item])
          if((finRequest[item]['category'] != '') &&
             (finRequest[item]['datetime'] != null) &&
             (finRequest[item]['headline'] != '') &&
             (finRequest[item]['id'] != null) &&
             (finRequest[item]['image'] != '') &&
             (finRequest[item]['related'] != '') &&
             (finRequest[item]['source'] != '') &&
             (finRequest[item]['summary'] != '') &&
             (finRequest[item]['url'] != '')){

            cleaned_json.push(finRequest[item]);
            count = count + 1;

            if(count==20){
                break;
            }
          }
    }
    cleaned_json = JSON.stringify(cleaned_json);
    return res.send(cleaned_json);
})

app.get('/api/v0/CompanyRecommendationTrends/:ticker', async function (req, res) {
    let finRequest = await FinhubAPI.finhubCompanyRecommendationTrendsAPICall(req.params.ticker);
    return res.send(finRequest);
})

app.get('/api/v0/CompanySocialSentiment/:ticker', async function (req, res) {
    let finRequest = await FinhubAPI.finhubCompanySocialSentimentAPICall(req.params.ticker);
    return res.send(finRequest);
})

app.get('/api/v0/CompanyPeers/:ticker', async function (req, res) {
    let finRequest = await FinhubAPI.finhubCompanyPeersAPICall(req.params.ticker);
    return res.send(finRequest);
})

app.get('/api/v0/CompanyEarning/:ticker', async function (req, res) {
    let finRequest = await FinhubAPI.finhubCompanyEarningsAPICall(req.params.ticker);
    return res.send(finRequest);
})

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_quickstart]

module.exports = app;
