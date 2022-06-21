/*

https://stackoverflow.com/questions/38510369/cannot-find-module-angular-http

https://ehsankhalighstock.uw.r.appspot.com
1) /api/v0/CompanyDescription/tsla [done]
2) /api/v0/CompanyHistoricalData/tsla  [done]
3) /api/v0/CompanyLatestPriceofStock/tsla [done]
4) /api/v0/Autocomplete/tsla [done]
5) /api/v0/CompanyNews/tsla [done]
6) /api/v0/CompanyRecommendationTrends/tsla [done]
7) /api/v0/CompanySocialSentiment/tsla [done]
8) /api/v0/CompanyPeers/tsla  *TO DO*
9) /api/v0/CompanyEarning/tsla [done]

https://ehsankhalighstock.uw.r.appspot.com

*/
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {HttpClientModule} from '@angular/common/http';
import {Host} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from 'rxjs';

import {searchAutoComplete} from './interfaces'
import {aboutTheCompany} from './interfaces'
import {stockPriceInfo} from './interfaces'
import {companyNewsData} from './interfaces'
import {stockRecomData} from './interfaces'
import {companySocialSentimentData} from './interfaces'
import {companyEarningData} from './interfaces'
import {companyHistoricalData} from './interfaces'
import {companyPeersArrayData} from './interfaces'


@Injectable({
  providedIn: 'root',
})

/*
moved to interfaces file
interface searchAutoComplete {
  description: string; // second
  displaySymbol: string; //first |
  symbol: string;
  type: string;
*/

export class BackendService {

  /*
  private searchAutoCompleteEndPoint = 'http://localhost:8080' + '/api/v0/Autocomplete';
  private aboutTheCompanyEndPoint = 'http://localhost:8080' + '/api/v0/CompanyDescription';
  private companyLatestPriceofStockEndPoint = 'http://localhost:8080' + '/api/v0/CompanyLatestPriceofStock';
  private companyNewsDataEndPoint = 'http://localhost:8080' + '/api/v0/CompanyNews';
  private stockRecomDataEndPoint = 'http://localhost:8080' + '/api/v0/CompanyRecommendationTrends';
  private companySocialSentimentDataEndPoint = 'http://localhost:8080' + '/api/v0/CompanySocialSentiment';
  private companyEarningDataEndPoint = 'http://localhost:8080' + '/api/v0/CompanyEarning';
  private companyHistoricalDataEndPoint = 'http://localhost:8080' + '/api/v0/CompanyHistoricalData';
  private companyHistoricalDataSummaryTabEndPoint = 'http://localhost:8080' + '/api/v0/CompanyHistoricalDataSummary';
  private companyPeersArrayDataEndPoint = 'http://localhost:8080' + '/api/v0/CompanyPeers';
  */

  private searchAutoCompleteEndPoint = 'https://ehsankhalighstock.uw.r.appspot.com' + '/api/v0/Autocomplete';

  private aboutTheCompanyEndPoint = 'https://ehsankhalighstock0.wm.r.appspot.com' + '/api/v0/CompanyDescription';
  private companyLatestPriceofStockEndPoint = 'https://ehsankhalighstock0.wm.r.appspot.com' + '/api/v0/CompanyLatestPriceofStock';
  private companyNewsDataEndPoint = 'https://ehsankhalighstock0.wm.r.appspot.com' + '/api/v0/CompanyNews';
  private stockRecomDataEndPoint = 'https://ehsankhalighstock0.wm.r.appspot.com' + '/api/v0/CompanyRecommendationTrends';

  private companySocialSentimentDataEndPoint = 'https://ehsankhalighstock1.wm.r.appspot.com' + '/api/v0/CompanySocialSentiment';
  private companyEarningDataEndPoint = 'https://ehsankhalighstock1.wm.r.appspot.com' + '/api/v0/CompanyEarning';
  private companyHistoricalDataEndPoint = 'https://ehsankhalighstock1.wm.r.appspot.com' + '/api/v0/CompanyHistoricalData';
  private companyHistoricalDataSummaryTabEndPoint = 'https://ehsankhalighstock1.wm.r.appspot.com' + '/api/v0/CompanyHistoricalDataSummary';
  private companyPeersArrayDataEndPoint = 'https://ehsankhalighstock1.wm.r.appspot.com' + '/api/v0/CompanyPeers';

  constructor(private http: HttpClient) {}

  getCompanyStockRecData(ticker: string): Observable<stockRecomData[]> {
  const fulStockRecomDataEndPointEndPoint = this.stockRecomDataEndPoint+"/"+ticker;
  //console.log("1");
  let return_val = this.http.get<stockRecomData[]>(fulStockRecomDataEndPointEndPoint);
  //console.log("**fulStockRecomDataEndPointEndPoint: " + fulStockRecomDataEndPointEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getSearchAutoComp(ticker: string): Observable<searchAutoComplete[]> {
  const fullSeachAPIEndpoint = this.searchAutoCompleteEndPoint+"/"+ticker;
  //console.log("2");
  let return_val = this.http.get<searchAutoComplete[]>(fullSeachAPIEndpoint);
  //console.log("**fullSeachAPIEndpoint: " + fullSeachAPIEndpoint)
  //let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getAboutTheCompany(ticker: string): Observable<aboutTheCompany[]> {
  const fullAboutTheCompanyEndPoint = this.aboutTheCompanyEndPoint+"/"+ticker;
  //console.log("3");
  let return_val = this.http.get<aboutTheCompany[]>(fullAboutTheCompanyEndPoint);
  //console.log("**fullAboutTheCompanyEndPoint: " + fullAboutTheCompanyEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getStockPriceInfo(ticker: string): Observable<stockPriceInfo[]> {
  const fulCompanyLatestPriceofStockEndPoint = this.companyLatestPriceofStockEndPoint+"/"+ticker;
  //console.log("4");
  let return_val = this.http.get<stockPriceInfo[]>(fulCompanyLatestPriceofStockEndPoint);
  //console.log("**fulCompanyLatestPriceofStockEndPoint: " + fulCompanyLatestPriceofStockEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getCompanyNewsData(ticker: string): Observable<companyNewsData[]> {
  const fulCompanyNewsDataEndPoint = this.companyNewsDataEndPoint+"/"+ticker;
  //console.log("5");
  let return_val = this.http.get<companyNewsData[]>(fulCompanyNewsDataEndPoint);
  //console.log("**fulCompanyNewsDataEndPoint: " + fulCompanyNewsDataEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getCompanySocialSentimentData(ticker: string): Observable<companySocialSentimentData[]> {
  const fulCompanySocialSentimentDataEndPoint = this.companySocialSentimentDataEndPoint+"/"+ticker;
  //console.log("6");
  let return_val = this.http.get<companySocialSentimentData[]>(fulCompanySocialSentimentDataEndPoint);
  //console.log("**fulCompanySocialSentimentDataEndPoint: " + fulCompanySocialSentimentDataEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getCompanyEarningData(ticker: string): Observable<companyEarningData[]> {
  const fulCompanyEarningDataEndPoint = this.companyEarningDataEndPoint+"/"+ticker;
  //console.log("7");
  let return_val = this.http.get<companyEarningData[]>(fulCompanyEarningDataEndPoint);
  //console.log("**fulCompanyEarningDataEndPoint: " + fulCompanyEarningDataEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getCompanyHistoricalData(ticker: string): Observable<companyHistoricalData[]> {
  const fulCompanyHistoricalDataEndPoint = this.companyHistoricalDataEndPoint+"/"+ticker;
  //console.log("8");
  let return_val = this.http.get<companyHistoricalData[]>(fulCompanyHistoricalDataEndPoint);
  //console.log("**fulCompanyHistoricalDataEndPoint: " + fulCompanyHistoricalDataEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getCompanyHistoricalDataSummaryTab(ticker: string): Observable<companyHistoricalData[]> {
  const fulCompanyHistoricalDataSummaryTabEndPointEndPoint = this.companyHistoricalDataSummaryTabEndPoint+"/"+ticker;
  //console.log("9");
  let return_val = this.http.get<companyHistoricalData[]>(fulCompanyHistoricalDataSummaryTabEndPointEndPoint);
  //console.log("**fulCompanyHistoricalDataEndPoint: " + fulCompanyHistoricalDataEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

  getCompanyPeersArrayData(ticker: string): Observable<companyPeersArrayData[]> {
  const fulCompanyPeersArrayDataEndPoint = this.companyPeersArrayDataEndPoint+"/"+ticker;
  //console.log("10");
  let return_val = this.http.get<companyPeersArrayData[]>(fulCompanyPeersArrayDataEndPoint);
  //console.log("**fulCompanyPeersArrayDataEndPoint: " + fulCompanyPeersArrayDataEndPoint)
  let return_val1 = return_val.subscribe(response => console.log(response));
  return return_val;
  }

}
