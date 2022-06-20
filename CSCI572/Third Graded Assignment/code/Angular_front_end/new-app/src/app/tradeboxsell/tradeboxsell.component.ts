import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

import { buySellModel } from '../interfaces';

import { DetailsSectionComponent } from '../details-section/details-section.component';
import { PortfolioSectionComponent } from '../portfolio-section/portfolio-section.component';


@Component({
  selector: 'app-tradeboxsell',
  templateUrl: './tradeboxsell.component.html',
  styleUrls: ['./tradeboxsell.component.css']
})
export class TradeboxsellComponent implements OnInit {

  @Input() public DataSellObj: buySellModel;
  constructor(public sellModalService: NgbActiveModal) { }

  warnbalanceFlagSell;
  balanceSell;
  mybalanceSell;
  inputNumberSell;

  inputbox(inputNumber){
    //console.log("inputNumber:", inputNumber);

    this.inputNumberSell = Number(inputNumber);
    this.DataSellObj.total = inputNumber * this.DataSellObj.currentPrice;
    this.DataSellObj.total = Math.round(this.DataSellObj.total * 100) / 100; //round

    let keys = Object.keys(localStorage);

    //does not own any stock
    if(keys.includes(this.DataSellObj.ticker) == false){
        this.warnbalanceFlagSell = true;
    }else{
        let boughtItemNumber = localStorage.getItem(this.DataSellObj.ticker);
        let parsedJson = JSON.parse(boughtItemNumber);
        let bought_quantity = Number(parsedJson["quantity"]);

        //console.log("boughtItemNumber:", boughtItemNumber);
        //console.log("parsedJson:", parsedJson);
        //console.log("bought_quantity:", bought_quantity);
        //console.log("inputNumber:", inputNumber);


        if(bought_quantity < inputNumber){
          //console.log("bought_quantity < inputNumber");
          this.warnbalanceFlagSell = true;
        }else{
          this.warnbalanceFlagSell = false;
        }
    }

  }


  sellbtn(){

    if(this.warnbalanceFlagSell == false){
      let currentBoughtItems = localStorage.getItem(this.DataSellObj.ticker);
      let parsedJson = JSON.parse(currentBoughtItems);

      let current_quantity = Number(parsedJson["quantity"]);
      let current_totalcost = Number(parsedJson["totalcost"]);
      let current_average = Number(parsedJson["avgCost"]);

      let sellQuant = Number(this.inputNumberSell);

      let newQuant = current_quantity - sellQuant;
      let totalsales = sellQuant * Number(this.DataSellObj['currentPrice']);
      let newtotalcost = current_totalcost - totalsales;
      let newaverage = newtotalcost/newQuant;

      newtotalcost = Math.round(newtotalcost * 100) / 100; //round
      newaverage = Math.round(newaverage * 100) / 100; //round

      let modifiedProfileitem = { quantity: newQuant,
                                  totalcost: newtotalcost,
                                  avgCost: newaverage,
                                  name: this.DataSellObj['name']
                                };

      localStorage.removeItem(this.DataSellObj.ticker);
      localStorage.setItem(this.DataSellObj.ticker, JSON.stringify(modifiedProfileitem));

      let currentBalance = localStorage.getItem("balance");
      let currentBalanceNumber = Number(currentBalance)

      localStorage.removeItem("balance");
      let newBalance = currentBalanceNumber + Number(this.DataSellObj.total)
      localStorage.setItem("balance", String(newBalance));

      //console.log("balance:", localStorage.getItem("balance"));

      this.sellModalService.dismiss('Cross click');

      DetailsSectionComponent.sellhideflag = true;

      if(PortfolioSectionComponent.reloadflag == true){
        PortfolioSectionComponent.reloadflag = false;
        window.location.reload();
      }

    }

  }

  ngOnInit() {
      this.balanceSell = localStorage.getItem("balance");
      this.balanceSell = Number(Number(this.balanceSell).toFixed(2));

  }

}
