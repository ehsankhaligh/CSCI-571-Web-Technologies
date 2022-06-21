import { FormBuilder} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { BackendService } from '../backend.service';
import { searchAutoComplete } from '../interfaces';
import { aboutTheCompany } from '../interfaces';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent implements OnInit {

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private backendServiceReq: BackendService
    ) {
      //Add later if necessary
    }

    filteredOptions: searchAutoComplete[] = []; //populate from json
    aboutcompany:aboutTheCompany[] = [];
    companySearchMatchForm: FormGroup;
    isLoading = false;
    emptySearchInput;
    validTickerFlag;
    clearflag;
    symbol: string;

    //this.companySearchMatchForm = new FormGroup({
    //   userSearchInput: new FormControl()
    //});

    ngOnInit() {
      //console.log("got inside ngOnInit()");
      this.companySearchMatchForm = this.formBuilder.group({ userSearchInput: '' });
      //console.log("this.companySearchMatchForm:" + this.companySearchMatchForm);
      this.companySearchMatchForm
        .get('userSearchInput')
        .valueChanges.pipe(
          debounceTime(100),
          tap(() => (this.isLoading = true)),
          switchMap((value) =>
            this.backendServiceReq
              .getSearchAutoComp(value)
              .pipe(finalize(() => (this.isLoading = false)))
          )
        )
        //.subscribe(response => console.log(response)); //test
        .subscribe(data => this.filteredOptions = data);
        //console.log("this.filteredOptions" + this.filteredOptions);
    }

    onSubmit(symbolData) {
          //console.log("0) this.validTickerFlag", this.validTickerFlag);
          //console.log("0) this.emptySearchInput", this.emptySearchInput);
          //console.log("0) symbolData.userSearchInput.symbol", symbolData.userSearchInput.symbol);
          //console.log("0) symbolData.userSearchInput", symbolData.userSearchInput);

          if (symbolData.userSearchInput.symbol) {
              this.symbol = symbolData.userSearchInput.symbol;
              //console.log('if this.symbol:', this.symbol);
          } else {
              this.symbol = symbolData.userSearchInput;
              //console.log('else this.symbol:', this.symbol);
          }

          if(!this.symbol){
            //console.log("this.symbol undef");
            this.symbol = "";

            //console.log('1) if .....');

          }else{
            //console.log('1) else .....');
            if(this.symbol != ""){
              //console.log('2) if .....');

              this.backendServiceReq.getAboutTheCompany(this.symbol).subscribe(data => {
                this.aboutcompany = data;
                //console.log("1) this.validTickerFlag", this.validTickerFlag);
                //console.log("1) Object.keys(this.aboutcompany).length", Object.keys(this.aboutcompany).length);
                if(Object.keys(this.aboutcompany).length != 0){
                  //console.log('3) if .....');
                  this.validTickerFlag = false;
                  this.router.navigateByUrl('/details/' + this.symbol);
                } else{
                  //console.log('4) else .....');
                  this.validTickerFlag = true;
                  //console.log("1) here true");
                }
                //console.log("2) this.validTickerFlag", this.validTickerFlag);
              });
            }
          }

          //console.log('this.symbol:', this.symbol);
          //console.log("3) this.validTickerFlag", this.validTickerFlag);

          if(this.symbol == ""){
              this.emptySearchInput = true;

          }/*else if(this.validTickerFlag == false){
            console.log("4) this.validTickerFlag", this.validTickerFlag);
            console.log("4) Entered Valid ticker", this.validTickerFlag);
            //this.router.navigateByUrl('/details/' + this.symbol);
          }*/
    }

    dropdown(option: searchAutoComplete) {
      if (option) {
        let result = option.symbol;
        return result;
      }
    }

    clearSearch(symbolData) {
      //console.log("symbolData.userSearchInput.symbol:" + symbolData.userSearchInput.symbol);
      //console.log("symbolData.userSearchInput:" + symbolData.userSearchInput);
      //console.log("Object.keys(symbolData).length:"+Object.keys(symbolData).length);
        try {
          this.emptySearchInput = false;
          this.validTickerFlag = false;
          this.clearflag = true;
          console.log("try clearSearch");
          this.companySearchMatchForm.reset();
        } catch (error) {
          console.log("catch clearSearch");
          this.emptySearchInput = false;
          this.validTickerFlag = false;
          this.clearflag = true;
        }

    }

    Search(symbolData) {
        //console.log("symbolData.userSearchInput.symbol:" + symbolData.userSearchInput.symbol);
        //console.log("symbolData.userSearchInput:" + symbolData.userSearchInput);
        if(symbolData.userSearchInput == null){
          symbolData  = {"userSearchInput": ""};
        }
        this.onSubmit(symbolData);
    }

}
