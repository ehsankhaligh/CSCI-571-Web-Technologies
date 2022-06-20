import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BackendService } from '../backend.service';
import { stockPriceInfo } from '../interfaces';


@Component({
  selector: 'app-watch-list-section',
  templateUrl: './watch-list-section.component.html',
  styleUrls: ['./watch-list-section.component.css']
})
export class WatchListSectionComponent implements OnInit {

  watchLocalStorage;
  json_display = [];
  warndisplayflag;
  arrowflag;

  stockPrice: stockPriceInfo[] = []; //populate from json

  constructor(private router: Router,
              private backendServiceReq: BackendService
             ) { }

  onclickArea(ticker){
    let trimed_ticker = ticker.replace(' ', ''); //remove space
    this.router.navigateByUrl('/details/' + trimed_ticker);
  }

  deleteItem(displayTicker){

    if(localStorage.getItem("items") != null){

      let watchList = JSON.parse(localStorage.getItem("items"));
      for (var i=0; i < Object.keys(watchList).length; i++) {

            let key_list = Object.keys(watchList);

            if(displayTicker === key_list[i]){
              delete watchList[displayTicker];
              localStorage.setItem("items", JSON.stringify(watchList));
            }
      }
      window.location.reload();

    }
  }

  onload(){
      //console.log("localStorage.getItem(\"balance\")", localStorage.getItem("balance"));
      if(localStorage.getItem("balance") == null){
          localStorage.setItem("balance", "25000");
          //console.log("localStorage.getItem(\"balance\")", localStorage.getItem("balance"));
      }

      this.watchLocalStorage = localStorage.getItem("items");
      let jsonLocalStore = JSON.parse(localStorage.getItem("items"));

      if((localStorage.getItem("items") == null) || (this.watchLocalStorage == '[]') ||  (localStorage.getItem("items") == '{}')){
            this.warndisplayflag = false;
      } else{

            for (var i=0; i < Object.keys(jsonLocalStore).length; i++) {

                  let key_list = Object.keys(jsonLocalStore);

                  /*
                  console.log(key_list[i]);
                  console.log(Object.values(jsonLocalStore)[i]);

                  console.log(Object.values(jsonLocalStore)[i]["name"]);
                  console.log(Object.values(jsonLocalStore)[i]["c"]);
                  console.log(Object.values(jsonLocalStore)[i]["d"]);
                  console.log(Object.values(jsonLocalStore)[i]["dp"]);
                  */

                  let my_ticker = key_list[i];
                  let my_d = Object.values(jsonLocalStore)[i]["d"]
                  let my_dp = Object.values(jsonLocalStore)[i]["dp"]
                  let my_name = Object.values(jsonLocalStore)[i]["name"]
                  let my_c = Object.values(jsonLocalStore)[i]["c"]

                  //dp color
                  let color;
                  if(my_dp < 0){
                     color = "red";
                     this.arrowflag = 0;
                  } else if (my_dp > 0){
                     color = "green";
                     this.arrowflag = 1;
                  } else{
                    color = "black";
                    this.arrowflag = 2;
                  }

                  this.json_display.push({ ticker: my_ticker,
                                           name: my_name,
                                           c: my_c,
                                           d: my_d,
                                           dp: my_dp,
                                           color: color
                  });

           }
           this.warndisplayflag = true;

      }

  }

  ngOnInit(){
      this.onload();
  }


}
