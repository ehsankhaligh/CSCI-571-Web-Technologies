package com.example.hw9stock;

public class stock_obj {

    private String ticker;
    private String sharesOwn;
    private String totalCost;
    private String avgCost;
    private Boolean watched;
    private String companyName;
    private String changevalue;
    private String mostRecentStockPrice;
    private String stockPriceChnagePercentagLastClose;
    private String totalstockPriceChnagePercentagProtfolio;
    private String marketValue;

    public stock_obj(String ticker, String sharesOwn, String totalCost, String avgCost, Boolean watched,
                     String companyName, String changevalue, String marketValue,
                     String mostRecentStockPrice, String stockPriceChnagePercentagLastClose, String totalstockPriceChnagePercentagProtfolio){

        this.ticker = ticker;
        this.sharesOwn = sharesOwn;
        this.totalCost = totalCost;
        this.watched = watched;
        this.avgCost = avgCost;
        this.companyName = companyName;
        this.changevalue = changevalue;
        this.marketValue = marketValue;
        this.mostRecentStockPrice = mostRecentStockPrice;
        this.stockPriceChnagePercentagLastClose = stockPriceChnagePercentagLastClose;
        this.totalstockPriceChnagePercentagProtfolio = totalstockPriceChnagePercentagProtfolio;
    }

    public void setMostRecentStockPrice(String mostRecentStockPrice) {
        this.mostRecentStockPrice = mostRecentStockPrice;
    }
    public String getMostRecentStockPrice() {
        return mostRecentStockPrice;
    }

    public void setStockPriceChnagePercentagLastClose(String stockPriceChnagePercentagLastClose) {
        this.stockPriceChnagePercentagLastClose = stockPriceChnagePercentagLastClose;
    }
    public String getStockPriceChnagePercentagLastClose() {
        return stockPriceChnagePercentagLastClose;
    }

    public void setTotalstockPriceChnagePercentagProtfolio(String totalstockPriceChnagePercentagProtfolio) {
        this.totalstockPriceChnagePercentagProtfolio = totalstockPriceChnagePercentagProtfolio;
    }
    public String getTotalstockPriceChnagePercentagProtfolio() {
        return totalstockPriceChnagePercentagProtfolio;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }
    public String getTicker() {
        return ticker;
    }

    public void setSharesOwn(String sharesOwn) {
        this.sharesOwn = sharesOwn;
    }
    public String getSharesOwn() {
        return sharesOwn;
    }

    public void setTotalCost(String totalCost) {
        this.totalCost = totalCost;
    }
    public String getTotalCost() {
        return totalCost;
    }

    public void setAvgCost(String avgCost) {
        this.avgCost = avgCost;
    }
    public String getAvgCost() {
        return avgCost;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getCompanyName() {
        return companyName;
    }

    public void setChangevalue(String changevalue) {
        this.changevalue = changevalue;
    }
    public String getChangevalue() {
        return changevalue;
    }

    public void setMarketValue(String marketValue) {
        this.marketValue = marketValue;
    }
    public String getMarketValue() {
        return marketValue;
    }

    public void setWatched(boolean watched) {
        this.watched = watched;
    }
    public Boolean getWatched() {
        return watched;
    }
}