package com.example.hw9stock;

public class newsModel {

    private String news_source;
    private String news_detail;
    private String news_imgURL;
    private String news_headline;
    private String news_date;
    private String news_url;
    private String news_category;

    // Constructor
    public newsModel(String news_source, String news_detail, String news_imgURL, String news_headline,
                     String news_date, String news_url, String news_category) {
        this.news_source = news_source;
        this.news_detail = news_detail;
        this.news_imgURL = news_imgURL;
        this.news_headline = news_headline;
        this.news_date = news_date;
        this.news_url = news_url;
        this.news_category = news_category;
    }

    // Getter and Setter
    public String getNews_source() {
        return news_source;
    }

    public void setNews_source(String news_source) {
        this.news_source = news_source;
    }

    // Getter and Setter
    public String getNews_detail() {
        return news_detail;
    }

    public void setNews_detail(String news_detail) {
        this.news_detail = news_detail;
    }

    public String getNews_imgURL() {
        return news_imgURL;
    }

    public void setNews_imgURL(String news_imgURL) {
        this.news_imgURL = news_imgURL;
    }

    public String getNews_headline() {
        return news_headline;
    }

    public void setNews_headline(String news_headline) {
        this.news_headline = news_headline;
    }

    public String getNews_date() {
        return news_date;
    }

    public void setNews_date(String news_date) {
        this.news_date = news_date;
    }

    public String getNews_url() {
        return news_url;
    }

    public void setNews_url(String news_url) {
        this.news_url = news_url;
    }

    public String getNews_category() {
        return news_source;
    }

    public void setNews_category(String news_category) {
        this.news_category = news_category;
    }

}