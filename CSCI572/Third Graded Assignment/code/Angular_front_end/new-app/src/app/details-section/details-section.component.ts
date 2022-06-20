declare var require: any;

import { ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';

import { HighchartsChartComponent } from 'highcharts-angular';
import { FormBuilder} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'highcharts/highstock';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockChart } from 'angular-highcharts';
import * as Highcharts from "highcharts/highstock";
import dragPanes from "highcharts/modules/drag-panes";
import indicators from "highcharts/indicators/indicators";
import volumeByPrice from "highcharts/indicators/volume-by-price";

dragPanes(Highcharts);
indicators(Highcharts);
volumeByPrice(Highcharts);

require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/volume-by-price')(Highcharts);

import { NewsShareComponent } from '../news-share/news-share.component';
import { TradeboxbuyComponent } from '../tradeboxbuy/tradeboxbuy.component';
import { TradeboxsellComponent } from '../tradeboxsell/tradeboxsell.component';


import { BackendService } from '../backend.service';
import { searchAutoComplete } from '../interfaces';
import { aboutTheCompany } from '../interfaces';
import { stockPriceInfo } from '../interfaces';
import { stockRecomData } from '../interfaces';
import { companyEarningData } from '../interfaces';
import { companyHistoricalData } from '../interfaces';
import { companyPeersArrayData } from '../interfaces';
import { companySocialSentimentData } from '../interfaces';
import { companyNewsData } from '../interfaces';
import { buySellModel } from '../interfaces';


@Component({
  selector: 'app-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.css']
})

export class DetailsSectionComponent implements OnInit {

  tradeboxbuyComp: TradeboxbuyComponent;
  stockPrice: stockPriceInfo[] = []; //populate from json
  aboutcompany:aboutTheCompany[] = [];
  newsdata:companyNewsData[] = [];
  buySell:buySellModel[] = [];
  stockHistoricalData: companyHistoricalData[] = [];
  stockChartsSecHistoricalData: companyHistoricalData[] = [];
  companyPeers: companyPeersArrayData[] = [];
  companySocialSent: companySocialSentimentData[] = [];
  companySocialSentTwitter: companySocialSentimentData[] = [];;
  companySocialSentReddit: companySocialSentimentData[] = [];;
  stockcompRec: stockRecomData[] = [];
  companyEarnings: companyEarningData[] =[];
  filteredOptions: searchAutoComplete[] = []; //populate from json
  ticker: string = '';
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  flagChats: boolean = false;
  chartOptions;
  recomChart;
  espChart;
  chartsSectionStockChart: Options;
  tdbodyflag = false;
  closeflag = false;
  openFlag = false;
  RedPriceColorflag = false;
  priceColor: string = '';
  highchartColorSummary: string = '';
  facebookURL;
  starSelectedFlag: boolean = false;
  ShowNotificationStarSelectedFlag;
  ShowHideFlag;
  currentSymbol: string = '';
  indexDelete;
  showDataflag;
  boughtFlag: boolean= false;

  companySearchMatchForm: FormGroup;
  isLoading = false;
  symbol: string;

  private _success = new Subject<string>();
  private updateSubscription: Subscription;

  staticAlertClosed = false;
  successMessage = '';

  static buyhideflag;
  static sellhideflag;

  public classReference = DetailsSectionComponent;

  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(
    protected newsPopUpNgbModal: NgbModal,
    protected buyPopUpNgbModal: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private searchRout: Router,
    private backendServiceReq: BackendService
  ) {
    DetailsSectionComponent.buyhideflag = false;
    DetailsSectionComponent.sellhideflag = false;
  }

  clearBox(){
      this.ShowHideFlag = false;
  }

  clearBoxBuySell(){
      DetailsSectionComponent.buyhideflag = false;
      DetailsSectionComponent.sellhideflag = false;
  }

  clearBoxBuySellAutohide(){
    setTimeout(()=>{
        DetailsSectionComponent.buyhideflag = false;
    }, 5000);
  }

  public StarListener() {

      this.ShowHideFlag = true;

      setTimeout(()=>{
          this.ShowHideFlag = false;
      }, 5000);

      let watchList;
      let newWatchList;
      let indexremove;

      if(localStorage.getItem("items") == null){
        watchList = {}; //page just loaded first time
      }else{
        watchList = JSON.parse(localStorage.getItem("items"));
      }

      if(this.starSelectedFlag == false){
            this.starSelectedFlag = true;
            this.ShowNotificationStarSelectedFlag = true;

           let ticket_name = this.aboutcompany['ticker'];
           newWatchList = { [ticket_name]: { "name": this.aboutcompany['name'],
                                             "c": this.stockPrice["c"],
                                             "d": this.stockPrice["d"],
                                            "dp": this.stockPrice["dp"]
                                         }
                          };

           if(Object.keys(watchList).length == 0){
             localStorage.setItem("items", JSON.stringify(newWatchList));

           }else{
             let concatNewWatchList = Object.assign(watchList, newWatchList);
             localStorage.setItem("items", JSON.stringify(concatNewWatchList));
           }
      } else{

        for (var i=0; i < Object.keys(watchList).length; i++) {

              let key_list = Object.keys(watchList);

              if(this.aboutcompany['ticker'] === key_list[i]){

                delete watchList[this.aboutcompany['ticker']];
                localStorage.setItem("items", JSON.stringify(watchList));

                this.starSelectedFlag = false;
                this.ShowNotificationStarSelectedFlag = false;

              }
        }


      }

  }

  popNewsDetailsShareBox(dataObj: companyNewsData) {

    var mydate = new Date(dataObj["datetime"] * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = mydate.getFullYear();
    var month = months[mydate.getMonth()];
    var date = mydate.getDate();
    var time = date + ' ' + month + ', ' + year;

    dataObj["time"] = time;
    const ngmodOpen = this.newsPopUpNgbModal.open(NewsShareComponent);
    ngmodOpen.componentInstance.DataNewsObj = dataObj;
  }

  popBuyShareBox() {

    const ngmodOpen = this.buyPopUpNgbModal.open(TradeboxbuyComponent);
    this.buySell['ticker'] = this.aboutcompany['ticker'];
    this.buySell['currentPrice'] = this.stockPrice["c"];
    this.buySell['name'] = this.aboutcompany["name"];
    ngmodOpen.componentInstance.DataBuyObj = this.buySell;

    if(ngmodOpen.componentInstance.DataBuyObj.boxnotificationFlag == true){
      this.boughtFlag = true;
      this.ShowHideFlag = true;

    }

  }

  popSellShareBox() {
    const ngmodOpen = this.buyPopUpNgbModal.open(TradeboxsellComponent);
    this.buySell['ticker'] = this.aboutcompany['ticker'];
    this.buySell['currentPrice'] = this.stockPrice["c"] ;
    this.buySell['name'] = this.aboutcompany["name"];
    ngmodOpen.componentInstance.DataSellObj = this.buySell;

    //this.boughtFlag = true;
    //this.ShowHideFlag = true;
  }

  drawChartHistoricalSection() {

    let unixtimeStmp;
    let ohlc_list = [];
    let vol_list = [];

    this.backendServiceReq.getCompanyHistoricalData(this.ticker).subscribe(data => {
      this.stockChartsSecHistoricalData = data;

      if(this.stockChartsSecHistoricalData.length != 0){

          let unixtimeStmp;
          let ohlc_list = [];
          let vol_list = [];
          let dataLength = data["c"].length;

          for (var x=0; x < dataLength; x += 1) {

          unixtimeStmp = data["t"][x]*1000;
          ohlc_list.push([unixtimeStmp,this.stockChartsSecHistoricalData["o"][x],this.stockChartsSecHistoricalData["h"][x],this.stockChartsSecHistoricalData["l"][x],this.stockChartsSecHistoricalData["c"][x]]);
          vol_list.push([unixtimeStmp,this.stockChartsSecHistoricalData["v"][x]]);
          }

          //console.log("ohlc_list", ohlc_list);
          //console.log("vol_list", vol_list);
          //https://www.highcharts.com/blog/tutorials/creating-custom-technical-indicators-financial-charts/
          //https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/stock/demo/sma-volume-by-price
          // create the chart
          //here
          this.isHighcharts = true;
          this.chartsSectionStockChart = {
            rangeSelector: {
                selected: 2
              },

              title: {
                text: this.ticker.toUpperCase() + ' Historical'
              },

              subtitle: {
                text: 'With SMA and Volume by Price technical indicators'
              },

              yAxis: [{
                startOnTick: false,
                endOnTick: false,
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
              }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
              }],

              tooltip: {
                split: true
              },

              plotOptions: {
                series: {
                    dataGrouping: {
                        units: [ [ 'minute',  [1]  ], [ 'month', [1, 2, 3, 4, 6] ] ]
                    }
                }
              },
              series: [{
                type: 'candlestick',
                name: 'AAPL',
                id: 'aapl',
                zIndex: 2,
                data: ohlc_list
              }, {
                type: 'column',
                name: 'Volume',
                id: 'volume',
                data: vol_list,
                yAxis: 1
              }, {
                type: 'vbp',
                linkedTo: 'aapl',
                params: {
                    volumeSeriesID: 'volume'
                },
                dataLabels: {
                    enabled: false
                },
                zoneLines: {
                    enabled: false
                }
              }, {
                type: 'sma',
                linkedTo: 'aapl',
                zIndex: 1,
                marker: {
                    enabled: false
                }
              }]
          }
        }

    });


  }

  getEarnings() {
    this.backendServiceReq.getCompanyEarningData(this.ticker).subscribe(data => {
      this.companyEarnings = data;
      //console.log('getEarnings()' + Date());

      let categories_list = [];
      let actual_list = [];
      let estimate_list = [];
      let count = this.companyEarnings.length;

      for (let i = 0; i < count; i += 1) {
        let surprise = this.companyEarnings[i]["surprise"];
        let period = this.companyEarnings[i]["period"];
        categories_list.push(period + " Surprise:" + surprise);
        actual_list.push(this.companyEarnings[i]["actual"]);
        estimate_list.push(this.companyEarnings[i]["estimate"]);
      }

      const Highcharts = require('highcharts');
      this.espChart = {

        chart: {
        type: 'spline'
        },
        title: {
            align: 'center',
            text: 'Historical ESP Surprises'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categories_list
        },
        yAxis: {
            title: {
                text: 'Quarterly ESP'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        legend: {
            align: 'center',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        series: [{
            name: 'Actual',
            marker: {
                symbol: 'square'
            },
            data: actual_list

        }, {
            name: 'Estimate',
            marker: {
                symbol: 'diamond'
            },
            data: estimate_list
        }]

      };

    });
  }

  getStockRec() {

    this.backendServiceReq.getCompanyStockRecData(this.ticker).subscribe(data => {
      this.stockcompRec = data;

      if(this.stockcompRec.length != 0){

          let x_axis_list = [];
          let stongBuy_list = [];
          let buy_list = [];
          let hold_list = [];
          let strongSell_list = [];
          let sell_list = [];
          let count_loop = 4;

          //[{"buy":32,"hold":4,"period":"2022-03-01","sell":0,"strongBuy":22,"strongSell":0,"symbol":"MSFT"} ...

          for(let i=0; i < count_loop; i += 1){
              buy_list.push(this.stockcompRec[i]['buy']);
              hold_list.push(this.stockcompRec[i]['hold']);
              sell_list.push(this.stockcompRec[i]['sell']);
              x_axis_list.push(this.stockcompRec[i]['period']);
              stongBuy_list.push(this.stockcompRec[i]['strongBuy']);
              strongSell_list.push(this.stockcompRec[i]['strongSell']);
          }


          const Highcharts = require('highcharts');
          this.recomChart = {

            chart: {
            type: 'column'
             },
             title: {
                 text: 'Recommendation Trends'
             },
             xAxis: {
                 categories: x_axis_list
             },
             yAxis: {
                 min: 0,
                 title: {
                     text: ''
                 },
                 stackLabels: {
                     enabled: true,
                     style: {
                         fontWeight: 'bold',
                         color: ( // theme
                             Highcharts.defaultOptions.title.style &&
                             Highcharts.defaultOptions.title.style.color
                         ) || 'gray'
                     }
                 }
             },
             legend: {
                 align: 'center',
                 x: -30,
                 verticalAlign: 'top',
                 y: 25,
                 floating: true,
                 backgroundColor:
                     Highcharts.defaultOptions.legend.backgroundColor || 'white',
                 borderColor: '#CCC',
                 borderWidth: 1,
                 shadow: false
             },
             tooltip: {
                 headerFormat: '<b>{point.x}</b><br/>',
                 pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
             },
             plotOptions: {
                 column: {
                     stacking: 'normal',
                     dataLabels: {
                         enabled: true
                     }
                 }
             },
             series: [{
                 name: 'Strong Buy',
                 data: stongBuy_list,
                 color: "#006600"
             }, {
                 name: 'Buy',
                 data: buy_list,
                 color: "#00CC00"
             }, {
                 name: 'Hold',
                 data: hold_list,
                 color: "#F59E1D"
             },{
                 name: 'Sell',
                 data: sell_list,
                 color: "#FF6666"
             },{
                 name: 'Strong Sell',
                 data: strongSell_list,
                 color: "#660000"
             }]

          };
      }

    });
  }

  getComonyNews() {
    this.backendServiceReq.getCompanyNewsData(this.ticker).subscribe(data => {
      this.newsdata = data;
      //console.log('getComonyNews()' + Date());
    });
  }

  getSocialSent(){
    this.backendServiceReq.getCompanySocialSentimentData(this.ticker).subscribe(data => {
      this.companySocialSent = data;

      //this.companySocialSentTwitter = this.companySocialSent['twitter'];
      //this.companySocialSentReddit = this.companySocialSent['reddit'];
      try{
        if(this.companySocialSent.length != 0){
          this.tdbodyflag = true;
          this.companySocialSentTwitter = this.companySocialSent['twitter'];
          this.companySocialSentReddit = this.companySocialSent['reddit'];

          if((this.companySocialSentTwitter == []) || (this.companySocialSentReddit == [])){
            this.showDataflag = false;
          }else{
            this.showDataflag = true;
          }

        }

        this.flagChats = true;

      } catch (error){
        console.log("") //debug later
      }

      //console.log('getCompPeers()' + Date());
    });

  }

  getCompPeers(){
    this.backendServiceReq.getCompanyPeersArrayData(this.ticker).subscribe(data => {
      this.companyPeers = data;
      //console.log('getCompPeers()' + Date());
    });

  }

  getStockPrice() {
    this.backendServiceReq.getStockPriceInfo(this.ticker).subscribe(data => {
      this.stockPrice = data;
      if(this.stockPrice.length != 0){

        var date = new Date(this.stockPrice["t"]*1000);
        let time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours()  + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.stockPrice["t"] = time;
        let hh_mm_ss = date.getHours()  + ":";

        //round two Decimals
        this.stockPrice["dp"] = Math.round(this.stockPrice["dp"] * 100) / 100;

        if(this.stockPrice["dp"]< 0){
            this.RedPriceColorflag = true;
            this.priceColor = "color:red";
            this.highchartColorSummary = '#c96a77';
        } else{
          this.RedPriceColorflag = false;
          this.priceColor = "color:green";
          this.highchartColorSummary = '#a6c96a';
        }

        if(hh_mm_ss=='13:'){
            this.closeflag = true;
        }
        else{
            this.openFlag = true;
        }
      }

      //console.log('getStockPrice()' + Date());
    });
  }

  getAboutCompany() {
    this.backendServiceReq.getAboutTheCompany(this.ticker).subscribe(data => {
      this.aboutcompany = data;
      //console.log('getAboutCompany()' + Date());
    });
  }

  drawChart() {

      let stock_price_list = [];

      this.backendServiceReq.getCompanyHistoricalDataSummaryTab(this.ticker).subscribe(data => {
      this.stockHistoricalData = data;


      if(this.stockHistoricalData.length != 0){

            let listLen = this.stockHistoricalData['c'].length;

            for (let i = 0; i < listLen; i += 1) {

                  try{
                    const unixTime = this.stockHistoricalData['t'][i]*1000;
                    const date = new Date(unixTime*1000);
                    const hour = date.toLocaleTimeString(navigator.language, {hour: '2-digit'})
                    stock_price_list.push([unixTime, this.stockHistoricalData['c'][i]]);
                  }catch(erro){
                    console.log("");//debug later
                  }

            }

            let ticker_name = this.ticker.toUpperCase();
            this.chartOptions = {
              series: [{
                data: stock_price_list,
                showInNavigator: true,
                color: this.highchartColorSummary,
                type: 'line',
                tooltip: {
                  valueDecimals: 2,
                },
              },],
              title: { text: ticker_name + " Hourly Price Variation"},
              rangeSelector: {
                enabled: false,
              },
              xAxis: {
                  type: 'datetime',
                  labels: {
                      //https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/labels/full-date
                      format: '{value:%H}'
                  }
              },
              navigator: {
                series: {
                  fillOpacity: 0,
                  type: 'area',
                  color: '#a6c96a'
                  },
              },
            };
        }
      });

  }

  callfunctions(){
          this.route.paramMap.subscribe((params) => {
            this.ticker = params.get('ticker');
            //console.log('http://localhost:4200/details/' + this.ticker);
      });

      try {
        //console.log("called callfunctions ...");
        this.getStockPrice();
        this.getAboutCompany();
        this.getCompPeers();
        this.getSocialSent();
        this.getStockRec();
        this.getEarnings();
        this.getComonyNews();
        this.getSocialSent();
        this.drawChartHistoricalSection();
        this.drawChart();
      } catch (error) {
        console.log(error);
      }
  }

  ngOnInit(){

    this.updateSubscription = interval(30000).subscribe(
        (val) => { this.callfunctions()
                 }
    );

    if(localStorage.getItem("balance") == null){
        localStorage.setItem("balance", "25000");
    }

    this.callfunctions();

    let pageURL = this.searchRout.url;
    let pageSymbol = pageURL.split("/");
    let currentpageSymbol = pageSymbol[2];
    this.currentSymbol = currentpageSymbol;


    let onloadwatchList;
    if(localStorage.getItem("items") == null){
      onloadwatchList = {}; //page just loaded first time
    }else{
      onloadwatchList = JSON.parse(localStorage.getItem("items"));

    }

    for (var i=0; i < Object.keys(onloadwatchList).length; i++) {
          let key_list = Object.keys(onloadwatchList);
          if(this.currentSymbol === key_list[i]){
            this.starSelectedFlag = true;
            this.ShowNotificationStarSelectedFlag = true;
          }
    }

  }

}
