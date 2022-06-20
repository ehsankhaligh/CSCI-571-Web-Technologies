/*
  Source:
  https://ng-bootstrap.github.io/#/components/modal/examples
*/

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

import { buySellModel } from '../interfaces';

import { DetailsSectionComponent } from '../details-section/details-section.component';
import { PortfolioSectionComponent } from '../portfolio-section/portfolio-section.component';

@Component({
  selector: 'app-tradeboxbuy',
  templateUrl: './tradeboxbuy.component.html',
  styleUrls: ['./tradeboxbuy.component.css']
})
export class TradeboxbuyComponent implements OnInit {

  @Input() public DataBuyObj: buySellModel;
  constructor(public buyModalService: NgbActiveModal) { }

  balance;
  warnbalanceFlag;
  mybalance;
  inputNumberBuy;
  boxnotificationFlag;

  static numberSharesBought = 0

  inputbox(inputNumber){
    //console.log("inputNumber:", inputNumber);
    //console.log("inputNumber typeof:", typeof inputNumber);

    this.inputNumberBuy = Number(inputNumber);

    //console.log("this.inputNumberBuy typeof:", this.inputNumberBuy);
    //console.log("this.inputNumberBuy typeof:", typeof this.inputNumberBuy);
    //console.log("this.DataBuyObj.currentPrice :", this.DataBuyObj.currentPrice);
    //console.log("this.DataBuyObj.currentPrice typeof:", typeof this.DataBuyObj.currentPrice);

    this.DataBuyObj.total = Number(this.inputNumberBuy) * Number(this.DataBuyObj.currentPrice);
    this.mybalance = localStorage.getItem("balance");

    //round
    this.DataBuyObj.total = Math.round(this.DataBuyObj.total * 100) / 100;
    this.mybalance = Math.round(this.mybalance * 100) / 100;

    //console.log("this.mybalance:", this.mybalance)
    //console.log("this.mybalance typeof:", typeof this.mybalance)
    //console.log("this.DataBuyObj.total:", this.DataBuyObj.total)
    //console.log("this.DataBuyObj.total typeof:", typeof this.DataBuyObj.total)

    if(Number(this.mybalance) < Number(this.DataBuyObj.total)){
        this.warnbalanceFlag = true;
        //console.log("this.warnbalanceFlag:",this.warnbalanceFlag)
    }else{
        this.warnbalanceFlag = false;
        //console.log("this.warnbalanceFlag:",this.warnbalanceFlag)
    }

  }

  buybtn(){

    let keys = Object.keys(localStorage)
    let keys_len = keys.length;

    //first time adding it & there is enough money
    if (this.inputNumberBuy != 0){

      if((keys.includes(this.DataBuyObj.ticker) == false) && (this.warnbalanceFlag == false)){

          let avgCostBought = (Number(this.DataBuyObj.total)/Number(this.inputNumberBuy));
          avgCostBought = Math.round(avgCostBought * 100) / 100; //round

          let newProfileitem = { quantity: Number(this.inputNumberBuy),
                                 totalcost: Number(this.DataBuyObj.total),
                                 avgCost: avgCostBought,
                                 name: this.DataBuyObj['name']
                              };

          localStorage.setItem(this.DataBuyObj.ticker, JSON.stringify(newProfileitem));

          let currentBalance = localStorage.getItem("balance");
          let currentBalanceNumber = Number(currentBalance);
          currentBalanceNumber = Math.round(currentBalanceNumber * 100) / 100; //round

          localStorage.removeItem("balance");
          let newBalance = currentBalanceNumber - Number(this.DataBuyObj.total);

          localStorage.setItem("balance", String(newBalance));

          this.boxnotificationFlag = true;
          DetailsSectionComponent.buyhideflag = true;

          if(PortfolioSectionComponent.reloadflag == true){
            PortfolioSectionComponent.reloadflag = false;
            window.location.reload();
          }

      }else if((keys.includes(this.DataBuyObj.ticker) == true) && (this.warnbalanceFlag == false)){
        let currentBoughtItems = localStorage.getItem(this.DataBuyObj.ticker);
        let parsedJson = JSON.parse(currentBoughtItems);

        let current_quantity = Number(parsedJson["quantity"]);
        let current_totalcost = Number(parsedJson["totalcost"]);

        let newquantity = Number(this.inputNumberBuy) + current_quantity;
        let newtotalCost = Number(this.DataBuyObj.total) + current_totalcost;
        let newavgCost = newtotalCost/newquantity;

        newquantity = Math.round(newquantity * 100) / 100; //round
        newtotalCost = Math.round(newtotalCost * 100) / 100; //round
        newavgCost = Math.round(newavgCost * 100) / 100; //round


        let modifiedProfileitem = { quantity: newquantity,
                                    totalcost: newtotalCost,
                                    avgCost: newavgCost,
                                    name: this.DataBuyObj['name']
                                  };

        localStorage.removeItem(this.DataBuyObj.ticker);
        localStorage.setItem(this.DataBuyObj.ticker, JSON.stringify(modifiedProfileitem));

        let currentBalance = localStorage.getItem("balance");
        localStorage.removeItem("balance");

        let currentBalanceNumber = Number(currentBalance);
        let newBalance = currentBalanceNumber - Number(this.DataBuyObj.total);

        localStorage.setItem("balance", String(newBalance));

        this.boxnotificationFlag = true;
        DetailsSectionComponent.buyhideflag = true;

        if(PortfolioSectionComponent.reloadflag == true){
          PortfolioSectionComponent.reloadflag = false;
          window.location.reload();
        }

      } else{
        console.log("enetered Zero on input box");
      }

    }
    this.buyModalService.dismiss('Cross click');
  }

  ngOnInit() {
    this.balance = localStorage.getItem("balance");
    this.balance = Number(Number(this.balance).toFixed(2));
  }

}
