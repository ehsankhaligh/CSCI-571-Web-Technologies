/*
https://stackoverflow.com/questions/21070101/show-hide-div-using-javascript
https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_preventdefault
https://stackoverflow.com/questions/2611980/return-value-from-nested-function-in-javascript
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
*/

/******************************************************************************/
function backendReq(url,htmlgenerateFunc) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //console.log("xhr:" + xhr);
        //console.log("**xhr.status:" + xhr.status);
        //console.log("**xhr.readyState:" + xhr.readyState);
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log("response received");
            //console.log("response type: " + typeof(xhr.responseText));
            console.log(JSON.parse(xhr.responseText));
            input_json = JSON.parse(xhr.responseText);
            //generate htmls
            //console.log("%j", input_json);
            //console.log("len input_json:" + Object.keys(input_json).length);
            htmlgenerateFunc(input_json);

        } else {
            console.log("*xhr.status:" + xhr.status);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function getCompTabInfo(symbol) {
    backendReq("/api/v1.0/stock/company/" + symbol, genrateCompanyTabHtml);
}

function getStockSumTabInfo(symbol) {
    backendReq("/api/v1.0/stock/stocksum/" + symbol, genrateStockSumTabHtml);
}

function getStockSumRecTabInfo(symbol) {
    backendReq("/api/v1.0/stock/stocksumrec/" + symbol, genrateStockSumRecHtml);
}

function getlatestLatestNewsTabInfo(symbol) {
    backendReq("/api/v1.0/stock/news/" + symbol, genrateLatestNewsTabHtml);
}

function getChartTabInfo(symbol) {
    backendReq("/api/v1.0/stock/charts/" + symbol, genrateChartsTabHtml);
}

/******************************************************************************/
function myFunction() {
  document.getElementById('topnav').style.visibility = 'hidden';
  document.getElementById('symbolNotFound').style.visibility = 'hidden';
}

function noSymbolFound() {

  document.getElementById("symbolNotFound").style.order = 0 ;
  document.getElementById("topnav").style.order = 1 ;
  document.getElementById("tab").style.order = 2 ;

  document.getElementById('companytabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumtabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumRecinfo').style.visibility = 'hidden';
  //document.getElementById('chartstabinfo').style.visibility = 'hidden'; //had an issue
  document.getElementById("chartstabinfo").style.display = "none";
  document.getElementById('latestnewstabinfo').style.visibility = 'hidden';
  document.getElementById('topnav').style.visibility = 'hidden';
  document.getElementById('symbolNotFound').style.visibility = 'visible';
}

function returnResult() {

  var header = document.getElementById("topnav");
  var buttons = header.getElementsByClassName("btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
  }

  var value = document.getElementById("searchBox").value;
  if (value == "") {

    document.getElementById("symbolNotFound").style.order = 2 ;
    document.getElementById("topnav").style.order = 1 ;
    document.getElementById("tab").style.order = 0 ;

    document.getElementById('topnav').style.visibility = 'hidden';
    document.getElementById('symbolNotFound').style.visibility = 'hidden';

    /*
    console.log("value:" + value);
    document.getElementById('searchimg').addEventListener('submit', function(e) {
    if(!value)
        e.preventDefault();
    });
    /*
    try {
      document.getElementById("validate").innerHTML; //Error but works to show the warning when box empty
    } catch (error) {
      console.log(error);
    }
    */

  }else{
    //Error handeling
    event.returnValue = false;

    document.getElementById("symbolNotFound").style.order = 2 ;
    document.getElementById("topnav").style.order = 1 ;
    document.getElementById("tab").style.order = 0 ;

    document.getElementById('symbolNotFound').style.visibility = 'hidden';
    document.getElementById('topnav').style.visibility = 'visible';

      getCompTabInfo(value);
      getStockSumTabInfo(value);
      getStockSumRecTabInfo(value);
      getlatestLatestNewsTabInfo(value);
      getChartTabInfo(value);
      //when requesting data
      showCompanyTabHtml();

    //check for Navigation Timing API support
    /*
    if (window.performance) {
      alert("window.performance works fine on this browser");
    }
    console.info(performance.navigation.type);
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      alert( "This page is reloaded" );
    } else {
      alert( "This page is not reloaded");
    }
    */
  }

}

function clearPage() {
  document.getElementById('topnav').style.visibility = 'hidden';
  document.getElementById('symbolNotFound').style.visibility = 'hidden';
}
/******************************************************************************/
function allTabsHide(){
  document.getElementById('companytabinfo').style.visibility = 'hide';
  document.getElementById('stocksumtabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumRecinfo').style.visibility = 'hidden';
  //document.getElementById('chartstabinfo').style.visibility = 'hidden'; //had an issue
  document.getElementById('latestnewstabinfo').style.visibility = 'hidden';
  document.getElementById("chartstabinfo").style.display = "none";
}

function showCompanyTabHtml(){
  document.getElementById("companytabinfo").style.order = 0 ;
  document.getElementById("stocksumtabinfo").style.order = 1;
  document.getElementById("stocksumRecinfo").style.order = 2;
  document.getElementById("chartstabinfo").style.order = 3;
  document.getElementById("latestnewstabinfo").style.order = 4;

  document.getElementById('companytabinfo').style.visibility = 'visible';
  document.getElementById('stocksumtabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumRecinfo').style.visibility = 'hidden';
  //document.getElementById('chartstabinfo').style.visibility = 'hidden';//had an issue
  document.getElementById('latestnewstabinfo').style.visibility = 'hidden';
  document.getElementById("chartstabinfo").style.display = "none";
}

function showStockSumTabHtml(){
  document.getElementById("companytabinfo").style.order = 2 ;
  document.getElementById("stocksumtabinfo").style.order = 0;
  document.getElementById("stocksumRecinfo").style.order = 1;
  document.getElementById("chartstabinfo").style.order = 3;
  document.getElementById("latestnewstabinfo").style.order = 4;

  document.getElementById('companytabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumtabinfo').style.visibility = 'visible';
  document.getElementById('stocksumRecinfo').style.visibility = 'visible';
  //document.getElementById('chartstabinfo').style.visibility = 'hidden'; //had an issue
  document.getElementById('latestnewstabinfo').style.visibility = 'hidden';
  document.getElementById("chartstabinfo").style.display = "none";

}

function showChartsTabHtml(){
  document.getElementById("companytabinfo").style.order = 1 ;
  document.getElementById("stocksumtabinfo").style.order = 2;
  document.getElementById("stocksumRecinfo").style.order = 3;
  document.getElementById("chartstabinfo").style.order = 0;
  document.getElementById("latestnewstabinfo").style.order = 4;

  document.getElementById('companytabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumtabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumRecinfo').style.visibility = 'hidden';
  //document.getElementById('chartstabinfo').style.visibility = 'visible'; //had an issue
  document.getElementById('latestnewstabinfo').style.visibility = 'hidden';
  document.getElementById("chartstabinfo").style.display = "block";

}

function showLatestNewsTabHtml(){
  document.getElementById("companytabinfo").style.order = 1 ;
  document.getElementById("stocksumtabinfo").style.order = 2;
  document.getElementById("stocksumRecinfo").style.order = 3;
  document.getElementById("chartstabinfo").style.order = 4;
  document.getElementById("latestnewstabinfo").style.order = 0;

  document.getElementById('companytabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumtabinfo').style.visibility = 'hidden';
  document.getElementById('stocksumRecinfo').style.visibility = 'hidden';
  //document.getElementById('chartstabinfo').style.visibility = 'hidden'; //had an issue
  document.getElementById('latestnewstabinfo').style.visibility = 'visible';
  document.getElementById("chartstabinfo").style.display = "none";
}

/******************************************************************************/
function genrateCompanyTabHtml(input_json) {
        /*
        compTabJson:
        exchange: "NASDAQ NMS - GLOBAL MARKET"
        finnhubIndustry: "Media"
        ipo: "2012-05-18"
        logo: "https://finnhub.io/api/logo?symbol=FB"
        name: "Meta Platforms Inc"
        ticker: "FB"
        */

        if(Object.keys(input_json["compTabJson"]).length > 0){
            var sybmolImg = input_json["compTabJson"]["logo"];
            var ticker = input_json["compTabJson"]["ticker"];
            var exchange = input_json["compTabJson"]["exchange"];
            var ipo = input_json["compTabJson"]["ipo"];
            var finnhubIndustry = input_json["compTabJson"]["finnhubIndustry"];
            var name = input_json["compTabJson"]["name"];
            var htmltable = "<p>";
            htmltable += "<br>";

            htmltable += "<img src=\"" + sybmolImg + "\" alt=\"symbol\" style=\"margin-left:50%;margin-right:50%\" width=\"100\" height=\"100\">" ;
            htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

            htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Company Name &nbsp;&nbsp;</b>"+name+"</p>";
            htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

            htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Stock Ticker Symbol &nbsp;&nbsp;</b>"+ticker+"</p>";
            htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

            htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Stock Exchange Code &nbsp;&nbsp;</b>"+exchange+"</p>";
            htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

            htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Company IPO Date &nbsp;&nbsp;</b> "+ipo+"</p>";
            htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

            htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Category &nbsp;&nbsp;</b>"+finnhubIndustry+"</p>";
            htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

            htmltable += "</p>";
            document.getElementById("companytabinfo").innerHTML = htmltable;
        }else{
            noSymbolFound();
        }
}

function genrateStockSumTabHtml(input_json) {
  /*

  "summaryTabJson": {
    "c": 224.91,
    "d": -12.18,
    "dp": -5.1373,
    "h": 238.24,
    "l": 224.01,
    "o": 237.7,
    "pc": 237.09,
    "t": 1644267603
   }
  */
  var symbol = input_json["summaryTabJson"]["symbol"];
  var tradingDay = input_json["summaryTabJson"]["t"];
  var previousClosePrice = input_json["summaryTabJson"]["pc"];
  var openingPrice = input_json["summaryTabJson"]["o"];
  var highPrice = input_json["summaryTabJson"]["h"];
  var lowPrice = input_json["summaryTabJson"]["l"];
  var change = input_json["summaryTabJson"]["d"];
  var changePercent = input_json["summaryTabJson"]["dp"];

  var changeSign_flag = String(change).includes("-");
  var changePercentSign_flag = String(changePercent).includes("-");

  if ((changeSign_flag == true) || (changePercentSign_flag == true)){
    signIMGPath = "/static/img/RedArrowDown.png";
  }else{
    signIMGPath = "/static/img/GreenArrowUp.png";
  }

  dateString = unixTimeConvert(tradingDay);

  var htmltable = "<p>";
  htmltable += "<br>";

  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Stock Ticker Symbol &nbsp;&nbsp;</b>"+symbol+"</p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Trading Day &nbsp;&nbsp;</b>"+dateString+"</p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Previous Closing Price &nbsp;&nbsp;</b>"+previousClosePrice+"</p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Opening Price &nbsp;&nbsp;</b> "+openingPrice+"</p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>High Price &nbsp;&nbsp;</b>"+highPrice+"</p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Low Price &nbsp;&nbsp;</b>"+lowPrice+"</p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Change &nbsp;&nbsp;</b>"+change+"<img src=\""+signIMGPath+"\" alt=\"sign\" style=\"width:20px;height:20px;margin-left:5px;\"></p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "<p style=\"margin-left:45%;margin-right:35%\"><b>Change Percent &nbsp;&nbsp;</b>"+changePercent+"<img src=\""+signIMGPath+"\" alt=\"sign\" style=\"width:20px;height:20px;margin-left:5px;\"></p>";
  htmltable += "<hr style=\"margin-left:40%;margin-right:35%\">";

  htmltable += "</p>";
  document.getElementById("stocksumtabinfo").innerHTML = htmltable;
}

function genrateStockSumRecHtml(input_json) {
  /*
  {
    "stockSummaryRecTabJson": {
      "buy": 35,
      "hold": 10,
      "period": "2022-02-01",
      "sell": 1,
      "strongBuy": 21,
      "strongSell": 0,
      "symbol": "FB"
    }
  }
  */
  var buy = input_json["stockSummaryRecTabJson"]["buy"];
  var hold = input_json["stockSummaryRecTabJson"]["hold"];
  var period = input_json["stockSummaryRecTabJson"]["period"];
  var sell = input_json["stockSummaryRecTabJson"]["sell"];
  var strongBuy = input_json["stockSummaryRecTabJson"]["strongBuy"];
  var strongSell = input_json["stockSummaryRecTabJson"]["strongSell"];
  var symbol = input_json["stockSummaryRecTabJson"]["symbol"];

  var htmltable = "";
  htmltable += "<div class=\"parent\" style=\"margin-left:42%;margin-right:30%\">";
  htmltable += "<div class=\"box\" id=\"zero\">Strong Sell</div>";
  htmltable += "<div class=\"box\" id=\"one\">"+strongSell+"</div>";
  htmltable += "<div class=\"box\" id=\"two\">"+sell+"</div>";
  htmltable += "<div class=\"box\" id=\"three\">"+hold+"</div>";
  htmltable += "<div class=\"box\" id=\"four\">"+buy+"</div>";
  htmltable += "<div class=\"box\" id=\"five\">"+strongBuy+"</div>";
  htmltable += "<div class=\"box\" id=\"six\">Strong Buy</div>";
  htmltable += "</div>";
  htmltable += "<p style=\"margin-left:45%;margin-right:25%\">Recommendation Trends</p>";
  document.getElementById("stocksumRecinfo").innerHTML = htmltable;
}

function genrateChartsTabHtml(input_json) {
      /*
      {
      "chartsTabJson": {
        "c": [...],
        "t": [...],
        "v": [...],
      }
      */
      //Error handeling
      //console.log('*****');
      //console.log(typeof input_json);
      //console.log(Object.keys(input_json["chartsTabJson"]).length);
      if (Object.keys(input_json["chartsTabJson"]).length === 0){
      return input_json === undefined || input_json === null;
      }

      var price_arr = [];
      var volume_arr = [];
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      time_now = yyyy + "-" + mm + "-" + dd;

      var symbol = input_json["chartsTabJson"]["symbol"]
      /*
      For mapping the Stock price data to data for HighCharts, create an array of data points (x1, y1) where x1 will be the date (in UTC format) and y1 will be the corresponding close stock price for that day. This array will then act as an input dataset for your HighCharts. Please refer to links in Section 3 for more details.
      Similarly create another array of points (x2, y2) where x2 will be the date (also in UTC format) and y1 will be the volume for that day. This array will be the second input for your HighCharts. Since you will be plotting Stock Price vs Date and Volume vs Date you will have two different datasets and two y- axis and a single x-axis.
      */

      // t,c,v are the same length verified by the api
      for (let i = 0; i < Object.keys(input_json["chartsTabJson"]["t"]).length; i++) {
          var tmp_arr1 = [input_json["chartsTabJson"]["t"][i]*1000, input_json["chartsTabJson"]["c"][i]];
          var tmp_arr2 = [input_json["chartsTabJson"]["t"][i]*1000, input_json["chartsTabJson"]["v"][i]];
          price_arr.push(tmp_arr1);
          volume_arr.push(tmp_arr2);
      }

      //console.log(price_arr);
      //console.log(volume_arr);

      //var htmltable = "";
      //htmltable += "<p>"+Object.keys(input_json["chartsTabJson"]["c"]).length+"</p>";
      //htmltable += "<p>"+Object.keys(input_json["chartsTabJson"]["t"]).length+"</p>";
      //htmltable += "<p>"+Object.keys(input_json["chartsTabJson"]["v"]).length+"</p>";

      //htmltable += "<p>"+price_arr.length+"</p>";
      //htmltable += "<p>"+volume_arr.length+"</p>";
      //htmltable += "<p>"+price_arr+"</p>";
      //htmltable += "<p>"+volume_arr+"</p>";
      //document.getElementById("chartstabinfo").innerHTML = htmltable;


      // create the chart
      //Source: https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/stock/demo/intraday-area
      Highcharts.stockChart('chartstabinfo', {

            title: {text: 'Stock Price ' + symbol + ' ' + time_now},
            subtitle: {
                text: '<a href="https://finnhub.io/" target="_blank">Sourse: finnhub</a>',
                useHTML: true
            },

            //xAxis: {
            //    gapGridLineWidth: 0
            //},
            xAxis: {
                type: 'datetime',
                labels: {
                    //https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/labels/full-date
                    format: '{value:%e. %b}'
                }
            },
            yAxis: [{
                title: {text: 'Volume', floating:true, x:10, y:10},
                labels: {align: 'right'},
                min: 0,

            }, {
                title: {text: 'Stock Price', floating:true, x:-10, y:10},
                labels: {align: 'left'},
                opposite: false,
                min: 0,
                style: {fontSize: "6px"}
            }],

            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'day',
                    count: 15,
                    text: '15d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }],
                selected: 0,
                inputEnabled: false
            },

            series: [{
                name: symbol + ' stock price',
                type: 'area',
                yAxis: 1,
                data: price_arr,

                tooltip: {
                    valueDecimals: 2
                },
            },{
                type: 'column',
                name: symbol + ' Volume',
                data: volume_arr,
                pointWidth: 5,
                yAxis: 0,
                showInNavigator: false,
            }]

        });



}

function genrateLatestNewsTabHtml(input_json) {

  /*{
    "latestNewsTabJson": {
      "0": {
        "datetime": 1644443793,
        "headline": "Super Bowl: NFL 'games and player storylines' drive social media engagement, Twitter executive says",
        "image": "https://s.yimg.com/hd/cp-video-transcode/prod/2022-02/09/62043892dbb05a11e3e1c50a/62043892dbb05a11e3e1c50b_o_U_v2.jpg",
        "url": "https://finnhub.io/api/news?id=f7b83f045b43fd0f86d9e45777c0ce62632242ac929e8c631eca4629b6e0611a"
      },
      "1": {
        "datetime": 1644442825,
        "headline": "Even Meta and Alphabet Don't Make This Sector a Blockbuster",
        "image": "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png",
        "url": "https://finnhub.io/api/news?id=835e7dd47ffbe712b980d9250a1ac159920a91cad8dbbc2e7bcf1c2c16c33b7c"
      },
      "2": {
        "datetime": 1644436344,
        "headline": "Biggest Single-Day Market Cap Drops in U.S. Stocks",
        "image": "https://s.yimg.com/ny/api/res/1.2/BVPu8U2A42yBoQTvnq9urw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03NzE-/https://s.yimg.com/uu/api/res/1.2/Drv06kqL4VPf9lEtYoa3vA--~B/aD0xMzg4O3c9MjE2MDthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/investopedia.com/a3d2202e459828d9a7cea9003ff902f2",
        "url": "https://finnhub.io/api/news?id=0c313c550728eb319d6fef85c288e83511a54da1d0bb8b205e5aa7d5ca278cd0"
      },
      "3": {
        "datetime": 1644417780,
        "headline": "Facebook Stock Is Rising. Today\u2019s the Day It Might End Its Slide.",
        "image": "https://s.yimg.com/ny/api/res/1.2/vpP2rPhufg5NlNMOUPZ.wg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://s.yimg.com/uu/api/res/1.2/uqbfOaEerh9vYI5TB6jzYQ--~B/aD02NDA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/Barrons.com/049a5e0370c0f290ca84bdedb84c78ec",
        "url": "https://finnhub.io/api/news?id=f2ba099d61763f31c1c5ea174f8e716cb3aadf9c2be9333f1ca6fe737d41fbdd"
      },
      "4": {
        "datetime": 1644434967,
        "headline": "Fed 'at or approaching peak hawkishness,\u2019 strategist says",
        "image": "https://s.yimg.com/ny/api/res/1.2/KbNtZay7T9vgq0b_mH4hdw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzQ-/https://s.yimg.com/hd/cp-video-transcode/prod/2022-02/09/620416174c9fa22f07c1ffa0/6204202645c76968c3c0be11_o_U_v3.jpg",
        "url": "https://finnhub.io/api/news?id=c925cfa067da4645db189bd1401cf8e6ddcea3839a940c3372534d989a4e4d5a"
      }
    }
  }*/

  var htmltable = "";
  htmltable = "<br><br>";
  for (let i = 0; i < Object.keys(input_json["latestNewsTabJson"]).length; i++) {
      datetime = input_json["latestNewsTabJson"][i]["datetime"];
      headline = input_json["latestNewsTabJson"][i]["headline"];
      imageURL = input_json["latestNewsTabJson"][i]["image"];
      url = input_json["latestNewsTabJson"][i]["url"];
      dateString = unixTimeConvert(datetime);
      htmltable +="<div class=\"newsBox\">";
      htmltable +="<div class=\"img\">";
      htmltable +="<img style=\"height:100px; width:100px;\" src=\""+imageURL+"\">";
      htmltable +="</div>";
      htmltable +="<div class=\"newsInfo\">";
      htmltable +="<p><b>"+headline+"</b></p>";
      htmltable +="<p>"+dateString+"</p>";
      htmltable +="<p><a target=\"_blank\" rel=\"noopener noreferrer\" href=\""+url+"\">See Original Post</a></p>";
      htmltable +="</div>";
      htmltable +="</div>";
      htmltable +="<br>";
      htmltable +="<br>";
  }

  document.getElementById("latestnewstabinfo").innerHTML = htmltable;

}

/*******************************************************************************/
function unixTimeConvert(UNIX_timestamp){
  var mydate = new Date(UNIX_timestamp * 1000);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var year = mydate.getFullYear();
  var month = months[mydate.getMonth()];
  var date = mydate.getDate();
  var display_str = date + ' ' + month + ', ' + year;
  return display_str;
}
