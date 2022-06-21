import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';

import { stockPriceInfo } from '../interfaces';
import { buySellModel } from '../interfaces';
import { aboutTheCompany } from '../interfaces';

import { BackendService } from '../backend.service';
import { TradeboxbuyComponent } from '../tradeboxbuy/tradeboxbuy.component';
import { TradeboxsellComponent } from '../tradeboxsell/tradeboxsell.component';

@Component({
  selector: 'app-portfolio-section',
  templateUrl: './portfolio-section.component.html',
  styleUrls: ['./portfolio-section.component.css']
})
export class PortfolioSectionComponent implements OnInit {


  tradeboxbuyComp: TradeboxbuyComponent;
  holdingsListDisplay = [];
  holdingsListDisplayFlag = false;
  stockPrice: stockPriceInfo[] = []; //populate from json
  aboutcompany:aboutTheCompany[] = [];
  buySell:buySellModel[] = [];
  trackListTmp = [];
  populateTableinfor;
  priceColor;
  marketvalColor;
  warnFlag;
  balance;
  ticker;

  static reloadflag;
  public myclassReference = PortfolioSectionComponent;
  private updateSubscription: Subscription;

  constructor(private backendServiceReq: BackendService,
              protected newsPopUpNgbModal: NgbModal,
              protected buyPopUpNgbModal: NgbModal,
              private router: Router
  ) { PortfolioSectionComponent.reloadflag = false; }

  getAboutCompany(givenTicker) {
    this.backendServiceReq.getAboutTheCompany(givenTicker).subscribe(data => {
      this.aboutcompany = data;
      //console.log('getAboutCompany()' + Date());
    });
  }

  popBuyShareBox(givenTicker) {

    this.backendServiceReq.getAboutTheCompany(givenTicker).subscribe(data => {
        this.aboutcompany = data;

        const ngmodOpen = this.buyPopUpNgbModal.open(TradeboxbuyComponent);
        this.buySell['ticker'] = this.aboutcompany['ticker'];
        this.buySell['currentPrice'] = this.stockPrice["c"];
        this.buySell['name'] = this.aboutcompany["name"];

        //console.log("getAboutCompany...");
        //console.log("this.buySell['ticker']:", this.buySell['ticker']);
        //console.log("this.buySell['currentPrice']:", this.buySell['currentPrice']);
        //console.log("this.buySell['name']:", this.buySell['name']);

        PortfolioSectionComponent.reloadflag = true;
        ngmodOpen.componentInstance.DataBuyObj = this.buySell;
    });
  }

  popSellShareBox(givenTicker) {

    this.backendServiceReq.getAboutTheCompany(givenTicker).subscribe(data => {
      this.aboutcompany = data;

      const ngmodOpen = this.buyPopUpNgbModal.open(TradeboxsellComponent);
      this.buySell['ticker'] = this.aboutcompany['ticker'];
      this.buySell['currentPrice'] = this.stockPrice["c"] ;
      this.buySell['name'] = this.aboutcompany["name"];

      //console.log("popSellShareBox...");
      //console.log("this.buySell['ticker']:", this.buySell['ticker']);
      //console.log("this.buySell['currentPrice']:", this.buySell['currentPrice']);
      //console.log("this.buySell['name']:", this.buySell['name']);

      PortfolioSectionComponent.reloadflag = true;
      ngmodOpen.componentInstance.DataSellObj = this.buySell;

    });
   }


  populateBoxEntries(){
    //how many stock holding
    this.balance = localStorage.getItem("balance");
    this.balance = Number(Number(this.balance).toFixed(2));
    let keys = Object.keys(localStorage);
    let tmpList = keys;
    let countStockHoldings = 0;
    let changeValue;

    for(let i=0; i < tmpList.length; i+=1){
      //console.log("tmpList[i]:", tmpList[i]);
      if((tmpList[i] == 'items') || (tmpList[i] == 'balance')){
        console.log("items or balance found ...")
      } else{
        countStockHoldings += 1;
        let tmpVar = localStorage.getItem(tmpList[i]);
        let parsedJson = JSON.parse(tmpVar);
        //console.log("parsedJson:",parsedJson);

        if(parsedJson.quantity>0){

            this.backendServiceReq.getStockPriceInfo(tmpList[i]).subscribe(data => {
              this.stockPrice = data;
              //console.log("this.stockPrice:",this.stockPrice);
              //console.log("this.stockPrice.c:",this.stockPrice["c"]);
              //console.log("this.stockPrice.d:",this.stockPrice["d"]);

              if(this.stockPrice.length != 0){

                //round two Decimals
                //console.log("parsedJson.avgCost:", Number(Number(parsedJson.avgCost).toFixed(2)) );
                //console.log("parsedJson.avgCost:", Number(this.stockPrice["c"]));

                let compare1 = Number(Number(parsedJson.avgCost).toFixed(2));
                let compare2 = Number(this.stockPrice["c"]);

                if(compare1 > compare2){
                  changeValue = Number(Number(parsedJson.avgCost).toFixed(2)) - Number(this.stockPrice["c"]);
                }else{
                  changeValue = Number(this.stockPrice["c"]) - Number(Number(parsedJson.avgCost).toFixed(2));
                }

                if(changeValue == 0){
                    this.priceColor = "black";
                } else if(changeValue< 0){
                    this.priceColor = "red";
                } else {
                    this.priceColor = "green";
                }

              }

              let marketval = Number(parsedJson.quantity) * Number(this.stockPrice["c"]);
              marketval = Math.round(marketval * 100) / 100; //round

              //console.log("parsedJson.totalcost:", parsedJson.totalcost);
              //console.log("marketval:", marketval);

              if (Number(marketval) == Number(parsedJson.totalcost.toFixed(2))){
                this.marketvalColor = "black";
              }else if (Number(marketval) > Number(parsedJson.totalcost)){
                this.marketvalColor = "green";
              }else{
                this.marketvalColor = "red";
              }

              //tmpVar: {"quantity":12,"totalcost":671.04,"avgCost":55.9}
              this.holdingsListDisplay.push({ symbol:tmpList[i],
                                              name:parsedJson.name,
                                              quantity:parsedJson.quantity,
                                              avgCost:parsedJson.avgCost.toFixed(2),
                                              totalcost:parsedJson.totalcost.toFixed(2),
                                              currentprice:this.stockPrice["c"],
                                              change:changeValue,
                                              marketValue:marketval,
                                              marketValueColor: this.marketvalColor,
                                              rightpriceColor: this.priceColor

              });

            });

            this.holdingsListDisplayFlag = true;

        }else{
            this.warnFlag = true;
            countStockHoldings -= 1;
        }
      }
    }

    if(countStockHoldings > 0){
      this.warnFlag = false;
    }else{
      this.warnFlag = true;
    }

  }

  ngOnInit(){

    //console.log("localStorage.getItem(\"balance\")", localStorage.getItem("balance"));
    if(localStorage.getItem("balance") == null){
        localStorage.setItem("balance", "25000");
        //console.log("localStorage.getItem(\"balance\")", localStorage.getItem("balance"));
        this.warnFlag = true;
    }else{
        this.warnFlag = false;
    }

    this.populateBoxEntries();
  }

}
