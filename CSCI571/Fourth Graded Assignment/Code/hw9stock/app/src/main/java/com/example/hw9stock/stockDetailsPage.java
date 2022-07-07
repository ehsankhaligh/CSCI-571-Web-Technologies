package com.example.hw9stock;

/*
    Sources:
    https://stackoverflow.com/questions/31242812/how-can-a-divider-line-be-added-in-an-android-recyclerview/40217754#40217754
    https://stackoverflow.com/questions/6393487/how-can-i-show-ellipses-on-my-textview-if-it-is-greater-than-the-1-line
    https://stackoverflow.com/questions/9264373/how-to-set-a-shapes-background-in-xml
    https://www.geeksforgeeks.org/cardview-using-recyclerview-in-android-with-example/
    https://stackoverflow.com/questions/4351064/how-do-i-add-this-to-an-arraylist-within-a-static-method
    https://www.geeksforgeeks.org/iterating-arraylists-java/
    https://www.javatpoint.com/java-string-to-int
    https://www.javatpoint.com/java-double-to-string
    https://www.geeksforgeeks.org/dialogfragment-in-android/
    https://stackoverflow.com/questions/22113821/android-error-dialogfragment-with-toast-dialoginterface
    https://www.w3resource.com/java-exercises/basic/java-basic-exercise-32.php
    https://localcoder.org/settext-of-textview-in-dialogfragment-from-calling-activity
    https://developer.android.com/reference/android/widget/SearchView.OnQueryTextListenerhttps://stackoverflow.com/questions/30449205/how-to-add-horizontal-scroll-view-and-a-listview-in-android
    https://stackoverflow.com/questions/30449205/how-to-add-horizontal-scroll-view-and-a-listview-in-android
    https://www.tutorialspoint.com/how-to-implement-horizontalscrollview-like-gallery-in-android
    https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyPeers/INTC
    https://jsonlint.com/
    https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyPeers/T
    https://www.youtube.com/watch?v=ywRkj4LQr1g
    https://www.geeksforgeeks.org/dialogfragment-in-android/
    https://www.geeksforgeeks.org/cardview-in-android-with-example/
    https://stackoverflow.com/questions/57631547/how-to-move-imageview-and-textview-in-cardview

 */

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.cardview.widget.CardView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.*;
import androidx.core.content.ContextCompat;
import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.format.DateUtils;
import android.text.style.UnderlineSpan;
import android.text.util.Linkify;
import android.util.Log;
import android.view.*;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.core.text.HtmlCompat;
import androidx.viewpager.widget.ViewPager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.widget.*;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.TimeZone;
import java.util.concurrent.atomic.AtomicInteger;
import io.github.luizgrp.sectionedrecyclerviewadapter.SectionedRecyclerViewAdapter;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class stockDetailsPage extends AppCompatActivity {

    // Arraylist for storing data
    private RecyclerView courseRV;
    private RecyclerView mycourseRV;
    private ArrayList<peersModel> peersModelArrayList;
    private ArrayList<newsModel> newsModelArrayList;

    public static int arrayListsrockIndexnum;
    public static String topNewheader;
    public static String topNewsDetails;
    public static String topNewsSource;
    public static String topNewDate;
    public static String topNewurl;

    public static String compURL;
    public static String stockticker;
    public static String companyName;
    public static String currentstockprice;
    public static boolean cuurent_watch_flag;

    // creating variables for our textview, imageview, and progressbar.
    private TextView ticker, companyname, stockprice, changedollaramount,
                     openprice, lowprice, highprice, prevclose, ipostartdate,
                     industry, webpage,newsSource,newsheadline,newshoursago;

    public static TextView sharedonwed, avgcost, totalcost, changeval, marketval;

    private ImageView companyimg, trendimg,topnewsimg;
    private WebView tablewebview;
    private ProgressBar loadingPB;
    private ConstraintLayout courseCV;
    private MenuItem star;
    public boolean starFlag;

    Button btnFragment;
    MyFragmentPagerAdapter myFragmentPagerAdapter;
    ViewPager viewPager;
    TabLayout tabLayout;

    String socialSentURL = "https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanySocialSentiment/" + MainActivity.getinputSymbol();
    String aboutCompURL = "https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyDescription/" + MainActivity.getinputSymbol();
    String companyLatestPriceofStockURL = "https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyLatestPriceofStock/" + MainActivity.getinputSymbol();
    String newsURL =  "https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyNews/" + MainActivity.getinputSymbol();
    String peersURL = "https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyPeers/" + MainActivity.getinputSymbol();

    private static final String TAG = "MyActivity";
    String msg = "Android : ";

    String myticker = MainActivity.getinputSymbol() + " ";
    public static stock_obj current_page_stock_obj;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //ArrayList<stock_obj> stockObjArrayList = MainActivity.getstockObjArrayList();
        int arrayList_size = MainActivity.getstockObjArrayList().size();
        boolean foundfalg = false;

        Integer x = new Integer(arrayList_size);
        Integer y = new Integer(0);

        //if(MainActivity.getstockObjArrayList().size()==0){
        if (x.equals(y)){
            //(String ticker, String sharesOwn, String totalCost, String avgCost, Boolean watched, String companyName)
            stock_obj new_stock_obj = new stock_obj(MainActivity.getinputSymbol(),"0","0", "0", false, "", "0", "0", "0", "0", "0");
            current_page_stock_obj = new_stock_obj;
            MainActivity.addTostockObjArrayList(current_page_stock_obj);
            arrayListsrockIndexnum = 0;
        }else{
            System.out.println("not equal");
        }

        for (int i = 0; i < MainActivity.getstockObjArrayList().size(); i++){
            stock_obj tmp_obj = MainActivity.getstockObjArrayList().get(i);
            String current_symbol = MainActivity.getinputSymbol();
            String current_obj_symbol = MainActivity.getstockObjArrayList().get(i).getTicker();
            if(MainActivity.getstockObjArrayList().get(i).getTicker().equals(MainActivity.getinputSymbol()) == true){
                current_page_stock_obj = MainActivity.getstockObjArrayList().get(i);
                arrayListsrockIndexnum = i;
                foundfalg = true;
            }
            /*
            //we are last item and object stock does not exist
            if(i+1 > stockObjArrayList.size()){
                //(String ticker, String sharesOwn, String totalCost, String avgCost, Boolean watched, String companyName)
                stock_obj new_stock_obj = new stock_obj(MainActivity.getinputSymbol(),"0","0", "0", false, "", "0", "0", "0", "0", "0");
                current_page_stock_obj = new_stock_obj;
                arrayListsrockIndexnum = i+1;
                MainActivity.addTostockObjArrayList(current_page_stock_obj);
            }
             */
        }
        if(foundfalg==false){
            stock_obj new_stock_obj = new stock_obj(MainActivity.getinputSymbol(),"0","0", "0", false, "", "0", "0", "0", "0", "0");
            current_page_stock_obj = new_stock_obj;
            arrayListsrockIndexnum = arrayListsrockIndexnum + 1;
            MainActivity.addTostockObjArrayList(current_page_stock_obj);
            foundfalg = true;
        }

        int number_tmp = arrayListsrockIndexnum;
        Toast.makeText(getApplicationContext(), "arrayListsrockIndexnum:"+Integer.toString(arrayListsrockIndexnum), Toast.LENGTH_SHORT).show();

        setContentView(R.layout.activity_stock_details);
        courseRV = findViewById(R.id.idRVCourse);
        mycourseRV = findViewById(R.id.myidRVCourse);

        viewPager = (ViewPager) findViewById(R.id.viewPager);
        tabLayout = (TabLayout) findViewById(R.id.tabLayout);

        setPagerAdapter();
        setTabLayout();

        Toolbar mytoolbar = findViewById(R.id.mydetail_toolbar);
        setSupportActionBar(mytoolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        getSupportActionBar().setTitle(MainActivity.getinputSymbol());

        loadingPB = findViewById(R.id.detailsidLoadingPB);
        ticker = findViewById(R.id.top_sum).findViewById(R.id.ticker);
        companyname = findViewById(R.id.top_sum).findViewById(R.id.company_name);
        companyimg = findViewById(R.id.top_sum).findViewById(R.id.componyimgage);
        trendimg = findViewById(R.id.top_sum).findViewById(R.id.trendimg);
        stockprice = findViewById(R.id.top_sum).findViewById(R.id.price);
        changedollaramount = findViewById(R.id.top_sum).findViewById(R.id.amount_change);
        openprice = findViewById(R.id.stats).findViewById(R.id.open_price_val);
        lowprice = findViewById(R.id.stats).findViewById(R.id.low_price_val);
        highprice = findViewById(R.id.stats).findViewById(R.id.high_price_val);
        prevclose= findViewById(R.id.stats).findViewById(R.id.prev_close_val);
        ipostartdate = findViewById(R.id.about).findViewById(R.id.ipo_val);
        industry = findViewById(R.id.about).findViewById(R.id.industry_val);

        newsSource = findViewById(R.id.top_news).findViewById(R.id.supporting_text);
        newsheadline = findViewById(R.id.top_news).findViewById(R.id.supporting_text1);
        topnewsimg = findViewById(R.id.top_news).findViewById(R.id.media_image);
        newshoursago = findViewById(R.id.top_news).findViewById(R.id.hours_ago);

        sharedonwed = findViewById(R.id.portfolio).findViewById(R.id.shares_owned_val);
        avgcost = findViewById(R.id.portfolio).findViewById(R.id.avg_cost_val);
        totalcost = findViewById(R.id.portfolio).findViewById(R.id.total_cost_val);
        changeval = findViewById(R.id.portfolio).findViewById(R.id.change_val);
        marketval = findViewById(R.id.portfolio).findViewById(R.id.market_value_val);

        webpage= findViewById(R.id.about).findViewById(R.id.webpage_val);
        tablewebview = (WebView) findViewById(R.id.insight).findViewById(R.id.table_insight);
        courseCV = findViewById(R.id.top_sum).findViewById(R.id.relativeLayout);

        // inside the on response method - we are hiding our progress bar.
        loadingPB.setProgressTintList(ColorStateList.valueOf(Color.rgb(138,43,226)));
        loadingPB.setVisibility(View.VISIBLE);

        webpage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                Intent i = new Intent(Intent.ACTION_VIEW);
                Object twitter_URL = Uri.parse(setTwittershareURL());
                i.setData((Uri) twitter_URL);
                view.getContext().startActivity(i);
                */
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(compURL));
                //intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.setPackage("com.android.chrome");
                try {
                    startActivity(intent);
                } catch (ActivityNotFoundException ex) {
                    // Chrome browser presumably not installed so allow user to choose instead
                    intent.setPackage(null);
                    startActivity(intent);
                }
            }
        });

        //initial portfolio values
        /*
        sharedonwed.setText(current_page_stock_obj.getSharesOwn());
        avgcost.setText("$" + current_page_stock_obj.getAvgCost());
        totalcost.setText("$" + current_page_stock_obj.getTotalCost());
        changeval.setText("$" + current_page_stock_obj.getChangevalue());
        marketval.setText("$" + current_page_stock_obj.getMarketValue());
        */
        sharedonwed.setText(MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getSharesOwn());
        avgcost.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getAvgCost());
        totalcost.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getTotalCost());
        changeval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getChangevalue());
        marketval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getMarketValue());

        /* -----------------------------------------------------------------------------------------*/

        //pop-up box news share
        findViewById(R.id.top_news).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                newsDialogFragment dialogFragment=new newsDialogFragment();
                dialogFragment.show(getSupportFragmentManager(),"My Fragment");
            }
        });

        /* -----------------------------------------------------------------------------------------*/

        btnFragment=findViewById(R.id.trade_button);
        btnFragment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tradeDialogFragment tradedialogFragment = new tradeDialogFragment();
                tradedialogFragment.show(getSupportFragmentManager(),"My  Fragment");
            }
        });

        /*-----------------------------------------------------------------------------------------*/

        RequestQueue myquotequeue = Volley.newRequestQueue(stockDetailsPage.this);
        JsonObjectRequest companyLatestPriceofStockjsonObjectRequest = new JsonObjectRequest(Request.Method.GET, companyLatestPriceofStockURL, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                try {
                    //{"c":977.2,"d":-50.95,"dp":-4.9555,"h":1034,"l":975.2501,"o":1030,"pc":1028.15,"t":1650484804}
                    String apistockprice = (String) response.getString("c");
                    String apichangedollarval = (String) response.getString("d");
                    String apichangepercent = (String) response.getString("dp");
                    String apiopenprice = (String) response.getString("o");
                    String apihighprice = (String) response.getString("h");
                    String apilowprice = (String) response.getString("l");
                    String apiprevclose = (String) response.getString("pc");

                    //for trade box
                    currentstockprice = apistockprice;
                    double total_shares =  Double.parseDouble(MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getSharesOwn());
                    double total_cost_old =  Double.parseDouble(MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getTotalCost());
                    double toral_cost_new = total_shares * Double.parseDouble(currentstockprice);

                    double change_new = total_cost_old - toral_cost_new;
                    double market_value_new = total_shares * Double.parseDouble(currentstockprice);

                    //round
                    change_new = change_new*100;
                    change_new = Math.round(change_new);
                    change_new = change_new /100;

                    market_value_new = market_value_new*100;
                    market_value_new = Math.round(market_value_new);
                    market_value_new = market_value_new /100;

                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setChangevalue(String.valueOf(change_new));
                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setMarketValue(String.valueOf(market_value_new));

                    if(change_new > 0){
                        changeval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getChangevalue());
                        marketval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getMarketValue());
                        changeval.setTextColor(Color.GREEN);
                        marketval.setTextColor(Color.GREEN);
                    }else if(change_new < 0){
                        changeval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getChangevalue());
                        marketval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getMarketValue());
                        changeval.setTextColor(Color.RED);
                        marketval.setTextColor(Color.RED);
                    }else{
                        changeval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getChangevalue());
                        marketval.setText("$" + MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getMarketValue());
                        changeval.setTextColor(Color.BLACK);
                        marketval.setTextColor(Color.BLACK);
                    }

                    if(apiprevclose.equals("") || apiprevclose.equals("null") || apiprevclose.equals("0") ){
                        apiprevclose = "0";
                    }

                    if(apilowprice.equals("") || apilowprice.equals("null") || apilowprice.equals("0") ){
                        apilowprice = "0";
                    }

                    if(apihighprice.equals("") || apihighprice.equals("null") || apihighprice.equals("0") ){
                        apihighprice = "0";
                    }

                    if(apiopenprice.equals("") || apiopenprice.equals("null") || apiopenprice.equals("0") ){
                        apiopenprice = "0";
                    }

                    if(apistockprice.equals("") || apistockprice.equals("null") || apistockprice.equals("0") ){
                         apistockprice = "0";
                    }

                    if(apichangedollarval.equals("") || apichangedollarval.equals("null") || apistockprice.equals("0") ){
                        apichangedollarval = "0";
                    }

                    if(apichangepercent.equals("") || apichangepercent.equals("null") || apichangepercent.equals("0") ){
                        apichangepercent = "0";
                    }


                    // after extracting all the data we are
                    // setting that data to all our views.
                    double apiprevclosedouble = Double.parseDouble(apiprevclose);
                    double apiprevclosedoublearound = Math.round(apiprevclosedouble * 100.0) / 100.0;
                    String apiprevclosedoublearoundStr = String.valueOf(apiprevclosedoublearound);
                    prevclose.setText("$" + apiprevclosedoublearoundStr);

                    double apihighpricedouble = Double.parseDouble(apihighprice);
                    double apihighpricedoublearound = Math.round(apihighpricedouble * 100.0) / 100.0;
                    String apihighpricedoublearoundStr = String.valueOf(apihighpricedoublearound);
                    highprice.setText("$" + apihighpricedoublearoundStr);

                    double apilowpricedouble = Double.parseDouble(apilowprice);
                    double apilowpricedoublearound = Math.round(apilowpricedouble * 100.0) / 100.0;
                    String apilowpricedoublearoundStr = String.valueOf(apilowpricedoublearound);
                    lowprice.setText("$" + apilowpricedoublearoundStr);

                    double apiopenpricedouble = Double.parseDouble(apiopenprice);
                    double apiopenpricedoublearound = Math.round(apiopenpricedouble * 100.0) / 100.0;
                    String apiopenpricedoublearoundStr = String.valueOf(apiopenpricedoublearound);
                    openprice.setText("$" + apiopenpricedoublearoundStr);

                    double apistockpricedouble = Double.parseDouble(apistockprice);
                    double apistockpricedoublearound = Math.round(apistockpricedouble * 100.0) / 100.0;
                    String apistockpricedoublearoundStr = String.valueOf(apistockpricedoublearound);
                    stockprice.setText("$" + apistockpricedoublearoundStr);

                    double apichangedollarvaldouble = Double.parseDouble(apichangedollarval);
                    double apichangedollarvaldoublearound = Math.round(apichangedollarvaldouble * 100.0) / 100.0;
                    String apichangedollarvaldoublearoundStr = String.valueOf(apichangedollarvaldoublearound);

                    double apichangepercentdouble = Double.parseDouble(apichangepercent);
                    double apichangepercentdoublearound = Math.round(apichangepercentdouble * 100.0) / 100.0;
                    String apichangepercentdoublearoundStr = String.valueOf(apichangepercentdoublearound);

                    //here
                    String displayStr = "$" + apichangedollarvaldoublearoundStr + " (" +  apichangepercentdoublearoundStr + "%)";
                    changedollaramount.setText(displayStr);
                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setStockPriceChnagePercentagLastClose(displayStr);
                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setMostRecentStockPrice(currentstockprice);

                    if (apichangedollarvaldouble < apiopenpricedoublearound){
                        changedollaramount.setTextColor(android.graphics.Color.rgb(200,0,0));
                        trendimg.setImageResource(R.drawable.ic_trending_down);
                    }else if (apichangedollarvaldouble > apiopenpricedoublearound){
                        changedollaramount.setTextColor(android.graphics.Color.rgb(0,102,51));
                        trendimg.setImageResource(R.drawable.ic_trending_up);
                    }else{
                        changedollaramount.setTextColor(android.graphics.Color.rgb(0,0,0));
                    }

                } catch (JSONException e) {
                    // if we do not extract data from json object properly.
                    // below line of code is use to handle json exception
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            // this is the error listener method which
            // we will call if we get any error from API.
            @Override
            public void onErrorResponse(VolleyError error) {
                // below line is use to display a toast message along with our error.
                //Toast.makeText(stockDetailsPage.this, "1) Fail to get data..", Toast.LENGTH_SHORT).show();
            }
        });
        // at last we are adding our json
        // object request to our request
        // queue to fetch all the json data.
        myquotequeue.add(companyLatestPriceofStockjsonObjectRequest);

        /*-----------------------------------------------------------------------------------------*/

        RequestQueue mystockdetailsqueue = Volley.newRequestQueue(stockDetailsPage.this);
        JsonObjectRequest aboutCompjsonObjectRequest = new JsonObjectRequest(Request.Method.GET, aboutCompURL, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                // inside the on response method.
                // we are hiding our progress bar.
                loadingPB.setVisibility(View.GONE);

                // in below line we are making our card
                // view visible after we get all the data.
                courseCV.setVisibility(View.VISIBLE);
                try {
                    // now we get our response from API in json object format.
                    // in below line we are extracting a string with its key
                    // value from our json object.
                    // similarly we are extracting all the strings from our json object.
                   /* {
                        "country": "US",
                            "currency": "USD",
                            "exchange": "NEW YORK STOCK EXCHANGE, INC.",
                            "finnhubIndustry": "Telecommunication",
                            "ipo": "1983-11-21",
                            "logo": "https://static.finnhub.io/logo/7d20269e-80ec-11ea-9277-00000000092a.png",
                            "marketCapitalization": 144357.86,
                            "name": "AT&T Inc",
                            "phone": "12108214105.0",
                            "shareOutstanding": 7142.89,
                            "ticker": "T",
                            "weburl": "https://www.att.com/"
                    }
                   */

                    String apiimageURL = response.getString("logo");
                    String apiticker = response.getString("ticker");
                    String apicompname = response.getString("name");
                    String apiipodate = response.getString("ipo");
                    String apiindustry = response.getString("finnhubIndustry");
                    String apiwebpage = response.getString("weburl");

                    //for dialog buy/sell box
                    stockticker = apiticker;
                    companyName = apicompname;
                    compURL = apiwebpage;

                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setTicker(stockticker);
                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setCompanyName(companyName);

                    // after extracting all the data we are
                    // setting that data to all our views.
                    ipostartdate.setText(apiipodate);
                    industry.setText(apiindustry);

                    SpannableString content = new SpannableString(apiwebpage);
                    content.setSpan(new UnderlineSpan(), 0, content.length(), 0);
                    webpage.setText(content);
                    webpage.setTextColor(Color.BLUE);
                    //Linkify.addLinks(webpage, Linkify.WEB_URLS); //https://stackoverflow.com/questions/28381809/how-to-make-the-textview-clickable-so-that-it-opens-the-url-in-the-web-browser

                    ticker.setText(apiticker);
                    companyname.setText(apicompname);
                    Picasso.get().load(apiimageURL).into(companyimg);

                } catch (JSONException e) {
                    // if we do not extract data from json object properly.
                    // below line of code is use to handle json exception
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            // this is the error listener method which
            // we will call if we get any error from API.
            @Override
            public void onErrorResponse(VolleyError error) {
                // below line is use to display a toast message along with our error.
                //Toast.makeText(stockDetailsPage.this, "2) Fail to get data..", Toast.LENGTH_SHORT).show();
            }
        });
        // at last we are adding our json
        // object request to our request
        // queue to fetch all the json data.
        mystockdetailsqueue.add(aboutCompjsonObjectRequest);

        /*-----------------------------------------------------------------------------------------*/
        RequestQueue mysocialsentqueue = Volley.newRequestQueue(stockDetailsPage.this);
        JsonObjectRequest socialSentjsonObjectRequest = new JsonObjectRequest(Request.Method.GET, socialSentURL, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                try {

                    JSONArray apiredditjsonarr= response.getJSONArray("reddit");
                    JSONArray apitwitterjsonarr= response.getJSONArray("twitter");

                    int apiredditjsonarrLength = apiredditjsonarr.length();
                    int apitwitterjsonarrLength = apitwitterjsonarr.length();

                    double twitterTotalMention = 0;
                    double twitterposMention = 0;
                    double twitternegMention = 0;

                    double redditTotalMention = 0;
                    double redditposMention = 0;
                    double redditnegMention = 0;

                    if(apiredditjsonarrLength >0){
                        for (int i=0;i< apiredditjsonarrLength;i++) {
                            JSONObject mytitemObject = apiredditjsonarr.getJSONObject(i);
                            String rtmention = (String) mytitemObject.getString("mention");
                            String rpmention = (String) mytitemObject.getString("positiveMention");
                            String rnmention = (String) mytitemObject.getString("negativeMention");

                            double tmentionedouble = Double.parseDouble(rtmention);
                            double pmentiondouble = Double.parseDouble(rpmention);
                            double nmentiondouble = Double.parseDouble(rnmention);

                            redditTotalMention += tmentionedouble;
                            redditposMention += pmentiondouble;
                            redditnegMention += nmentiondouble;

                        }
                    }

                    System.out.println(redditnegMention);
                    String redditTotalMentionStr = String.valueOf((int) redditTotalMention);
                    String redditposMentionStr = String.valueOf((int) redditposMention);
                    String redditnegMentionStr = String.valueOf((int) redditnegMention);

                    if(apitwitterjsonarrLength >0){
                        for (int i=0;i< apiredditjsonarrLength;i++) {
                            JSONObject myritemObject = apiredditjsonarr.getJSONObject(i);
                            String ttmention = (String) myritemObject.getString("mention");
                            String tpmention = (String) myritemObject.getString("positiveMention");
                            String tnmention = (String) myritemObject.getString("negativeMention");

                            double ttmentionedouble = Double.parseDouble(ttmention);
                            double tpmentiondouble = Double.parseDouble(tpmention);
                            double tnmentiondouble = Double.parseDouble(tnmention);

                            twitterTotalMention += ttmentionedouble;
                            twitterposMention += tpmentiondouble;
                            twitternegMention += tnmentiondouble;

                        }
                    }

                    String twitterTotalMentionStr = String.valueOf((int) twitterTotalMention);
                    String twitterposMentionStr = String.valueOf((int) twitterposMention);
                    String twitternegMentionStr = String.valueOf((int) twitternegMention);

                    //https://stackoverflow.com/questions/66526111/how-to-apply-the-css-styling-from-the-string-resource-in-htmlcompat-fromhtml
                    String htmlString = "<!DOCTYPE html> <html> <head> <style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; } table { border-collapse: separate; border-spacing: 0.25em 0.25em; } tr:nth-child(1) { background-color: #C6C6C6; } .highlight { background: #C6C6C6; } .highlight1 { background: #EEEEEE; } p.headertekst { text-align: center; font-family: Arial, Helvetica, sans-serif; } </style> </head> <body> <p class=\"headertekst\">Social Sentiment</p> <table class=\"table\"> <colgroup> <col class=\"highlight\"> <col class=\"highlight1\"> <col class=\"highlight1\"> </colgroup> <tr> <th>Apple Inc</th> <th>Reddit</th> <th>Twitter</th> </tr> <tr> <td>Total Mentions</td> <td>"+redditTotalMentionStr+"</td> <td>"+twitterTotalMentionStr+"</td> </tr> <tr> <td>Positive Mentions</td> <td>"+redditposMentionStr+"</td> <td>"+twitterposMentionStr+"</td> </tr> <tr> <td>Negative Mentions</td> <td>"+redditnegMentionStr+"</td> <td>"+twitternegMentionStr+"</td> </tr> </table> </body> </html>";
                    tablewebview.loadData(htmlString, "text/html", "utf-8");

                } catch (JSONException e) {
                    // if we do not extract data from json object properly.
                    // below line of code is use to handle json exception
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            // this is the error listener method which
            // we will call if we get any error from API.
            @Override
            public void onErrorResponse(VolleyError error) {
                // below line is use to display a toast message along with our error.
                //Toast.makeText(stockDetailsPage.this, "3) Fail to get data..", Toast.LENGTH_SHORT).show();
            }
        });
        // at last we are adding our json
        // object request to our request
        // queue to fetch all the json data.
        mysocialsentqueue.add(socialSentjsonObjectRequest);

        /*------------------------------------------------------------------------------------------*/
        newsModelArrayList = new ArrayList<>();
        RequestQueue mynewsqueue= Volley.newRequestQueue(stockDetailsPage.this);
        JsonArrayRequest newsObjectRequest = new JsonArrayRequest (Request.Method.GET, newsURL, null, new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray response) {
                        JSONObject jsonObject = new JSONObject();

                        try {
                            jsonObject.put("arrayName",response);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        java.util.Iterator<String> iter = jsonObject.keys();
                        while (iter.hasNext()) {
                            String key = iter.next();
                            try {
                                Object value = jsonObject.get(key);
                                System.out.println("***value:" + value.toString());
                                JSONArray myjsonArray1 = new JSONArray(value.toString());

                                for (int i=0;i< myjsonArray1.length();i++) {
                                    JSONObject myitemObject = myjsonArray1.getJSONObject(i);
                                    /*
                                    [{
                                        "category": "company",
                                        "datetime": 1650790800,
                                        "headline": "Wall St Week Ahead-Stakes are high as megacap companies highlight big earnings week",
                                        "id": 109822819,
                                        "image": "https://www.nasdaq.com/sites/acquia.prod/files/2022-04-22T111532Z_1_OT4_RTRLXPP_2_LYNXPACKAGER.JPG?2002145616",
                                        "related": "FB",
                                        "source": "Nasdaq",
                                        "summary": "Investors are hoping a flood of U.S. quarterly reports next week, including those from megacap growth titans, will confirm a solid profit outlook for corporate America and bolster the case for stocks after a rocky start to the year.",
                                        "url": "https://finnhub.io/api/news?id=89bd43fd910db53fd643ef9851b4758df49a3af18b3d1bc60d9c657d9702c7dd"
                                    }....
                                    */
                                    String source = myitemObject.getString("source");
                                    String headline = myitemObject.getString("headline");
                                    String imgurl = myitemObject.getString("image");

                                    //top news
                                    if(i==0){
                                        topNewsDetails = myitemObject.getString("summary");
                                        topNewsSource = source;
                                        topNewDate = myitemObject.getString("datetime");
                                        topNewheader = headline;
                                        topNewurl = myitemObject.getString("url");

                                        //https://stackoverflow.com/questions/7693324/how-to-convert-string-to-long-in-java
                                        //https://mkyong.com/java8/java-8-convert-epoch-time-milliseconds-to-localdate-or-localdatetime/
                                        //https://www.codegrepper.com/code-examples/java/java+how+to+subtract+two+dates+
                                        LocalDate ld = Instant.ofEpochMilli(Long.parseLong(topNewDate)).atZone(ZoneId.systemDefault()).toLocalDate();
                                        LocalDate now = LocalDate.now();
                                        LocalDate behind = ld;
                                        //LocalDate sixDaysBehind = now.minusDays(6);
                                        Period period = Period.between(now, behind);
                                        int diff = period.getDays() * (-1);
                                        String s = Integer.toString(diff);
                                        newshoursago.setText(s + " hours ago\n");

                                        newsSource.setText(source);
                                        newsheadline.setText(headline);
                                        Picasso.get().load(imgurl).into(topnewsimg);

                                    }else{
                                        //newsModelArrayList = new ArrayList<>();
                                        /*
                                        String news_source,
                                        String news_detail,
                                        String news_imgURL,
                                        String news_headline,
                                        String news_date,
                                        String news_url,
                                        String news_category
                                        */

                                        String nsource = myitemObject.getString("source");
                                        String nheadline = myitemObject.getString("headline");
                                        String nimgurl = myitemObject.getString("image");
                                        String nDetails = myitemObject.getString("summary");
                                        String nNewDate = myitemObject.getString("datetime");
                                        String nNewurl = myitemObject.getString("url");
                                        newsModelArrayList.add(new newsModel( nsource,  nDetails,  nimgurl,  nheadline, nNewDate, nNewurl,  "N/A"));

                                    }

                                }
                                // we are initializing our adapter class and passing our arraylist to it.
                                //CourseAdapter courseAdapter = new CourseAdapter(this, courseModelArrayList);
                                NewsAdapter newsAdapter = new NewsAdapter(stockDetailsPage.this, newsModelArrayList);

                                // below line is for setting a layout manager for our recycler view.
                                // here we are creating vertical list so we will provide orientation as vertical
                                LinearLayoutManager linearLayoutManager = new LinearLayoutManager(stockDetailsPage.this, LinearLayoutManager.VERTICAL, false);

                                // in below two lines we are setting layoutmanager and adapter to our recycler view.
                                courseRV.setLayoutManager(linearLayoutManager);
                                courseRV.setAdapter(newsAdapter);

                            } catch (JSONException e) {
                                // Something went wrong!
                            }
                        }

                    }

                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // TODO: Handle error
                        System.out.println("Error....");
                        System.out.println(error);
                    }
                });
        // at last we are adding our json
        // object request to our request
        // queue to fetch all the json data.
        mynewsqueue.add(newsObjectRequest);
        /*------------------------------------------------------------------------------------------*/
        peersModelArrayList = new ArrayList<>();
        RequestQueue mypeerqueue = Volley.newRequestQueue(stockDetailsPage.this);
        JsonArrayRequest mypeersObjectRequest = new JsonArrayRequest (Request.Method.GET, peersURL, null, new Response.Listener<JSONArray>() {

            @Override
            public void onResponse(JSONArray response) {
                JSONObject jsonObject = new JSONObject();

                try {
                    jsonObject.put("arrayName",response);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                java.util.Iterator<String> iter = jsonObject.keys();
                while (iter.hasNext()) {
                    String key = iter.next();
                    try {
                        Object value = jsonObject.get(key);
                        System.out.println("***value:" + value.toString());
                        JSONArray myjsonArray1 = new JSONArray(value.toString());

                        for (int i = 0; i < myjsonArray1.length(); i++) {
                            JSONObject myitemObject = myjsonArray1.getJSONObject(i);
                            /*
                            [{  "item": "NVDA",
                                "weburl": "https://www.nvidia.com/"
                            }, {
                                "item": "AVGO",
                                "weburl": "https://www.broadcom.com"
                            }....
                            */
                            String mypeer = myitemObject.getString("item");
                            peersModelArrayList.add(new peersModel(mypeer));

                        }

                        peersAdapter mypeerAdapter = new peersAdapter(stockDetailsPage.this, peersModelArrayList);
                        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(stockDetailsPage.this, LinearLayoutManager.HORIZONTAL, false);
                        mycourseRV.setLayoutManager(linearLayoutManager);
                        mycourseRV.setAdapter(mypeerAdapter);

                    } catch (JSONException e) {
                        System.out.println("Error....");
                    }
                }

            }

        }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                // TODO: Handle error
                System.out.println("Error....");
                System.out.println(error);
            }
        });
        // at last we are adding our json
        // object request to our request
        // queue to fetch all the json data.
        mypeerqueue.add(mypeersObjectRequest);
    }

    private void setPagerAdapter(){
        myFragmentPagerAdapter = new MyFragmentPagerAdapter(getSupportFragmentManager());
        viewPager.setAdapter(myFragmentPagerAdapter);
    }
    private void setTabLayout() {
        tabLayout.setupWithViewPager(viewPager);
        //Adding the tabs using addTab() method
        tabLayout.getTabAt(0).setIcon(R.drawable.chart_line);
        tabLayout.getTabAt(1).setIcon(R.drawable.clock);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater mymenuInflater = getMenuInflater();
        mymenuInflater.inflate(R.menu.menu_main_details, menu);
        star = menu.findItem(R.id.star_empty);
        //here
        //cuurent_watch_flag = true; //debug
        //if (cuurent_watch_flag == true){
        if (MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).getWatched() == true){
            star.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_star_filled));
            starFlag = true;
        }else{
            starFlag = false;
        }

        return true;
    }

    //Source: https://stackoverflow.com/questions/7479992/handling-a-menu-item-click-event-android
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.star_empty:
                int comapreResult = Boolean.compare(starFlag,true);
                if (comapreResult == 0) {
                    star.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_star_empty));
                    starFlag = false;
                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setWatched(false);
                    Toast.makeText(stockDetailsPage.this, myticker + "is removed from favorites", Toast.LENGTH_LONG).show();
                } else {
                    star.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_star_filled));
                    starFlag = true;
                    MainActivity.getstockObjArrayList().get(arrayListsrockIndexnum).setWatched(true);
                    Toast.makeText(stockDetailsPage.this, myticker + "is added to favorites", Toast.LENGTH_LONG).show();
                }
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    //https://stackoverflow.com/questions/6719814/onpagefinished-never-called-webview
    //https://stackoverflow.com/questions/18942941/findviewbyid-returns-null-for-webview
    //https://www.tabnine.com/code/java/methods/android.webkit.WebSettings/setAllowFileAccess
    private void fetchRecChartArea() {
        WebView mywebView;
        mywebView = (WebView) findViewById(R.id.insight_rec_chart).findViewById(R.id.rec_trend);
        WebSettings mysettings = mywebView.getSettings();
        mysettings.setJavaScriptEnabled(true);
        mywebView.clearCache(true);
        mysettings.setDomStorageEnabled(true);
        mysettings.setAllowFileAccessFromFileURLs(true);
        mysettings.setAllowFileAccess(true);
        mywebView.setWebViewClient(new WebViewClient());


        mywebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                //Toast.makeText(getApplicationContext(), "fetching rec charts data ...", Toast.LENGTH_SHORT).show();
                view.loadUrl("javascript:getrecTrendChart(\"https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyRecommendationTrends/"+MainActivity.getinputSymbol()+"\")");
                //Toast.makeText(getApplicationContext(), "Done!", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                //Toast.makeText(getApplicationContext(), "Oh no! " + description, Toast.LENGTH_SHORT).show();
            }
        });
        mywebView.loadUrl("file:///android_asset/rectrend.html");
    }

    //https://stackoverflow.com/questions/6719814/onpagefinished-never-called-webview
    //https://stackoverflow.com/questions/18942941/findviewbyid-returns-null-for-webview
    //https://www.tabnine.com/code/java/methods/android.webkit.WebSettings/setAllowFileAccess
    private void fetchEspChartArea() {
        WebView mywebView;
        mywebView = (WebView) findViewById(R.id.insight_esp_chart).findViewById(R.id.esp_chart);
        WebSettings mysettings = mywebView.getSettings();
        mysettings.setJavaScriptEnabled(true);
        mywebView.clearCache(true);
        mysettings.setDomStorageEnabled(true);
        mysettings.setAllowFileAccessFromFileURLs(true);
        mysettings.setAllowFileAccess(true);
        mywebView.setWebViewClient(new WebViewClient());

        mywebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                //Toast.makeText(getApplicationContext(), "fetching esp charts data ...", Toast.LENGTH_SHORT).show();
                view.loadUrl("javascript:getespChart(\"https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyEarning/"+MainActivity.getinputSymbol()+"\")");
                //Toast.makeText(getApplicationContext(), "Done!", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                //Toast.makeText(getApplicationContext(), "Oh no! " + description, Toast.LENGTH_SHORT).show();
            }
        });
        mywebView.loadUrl("file:///android_asset/esp.html");
    }

    /** Called when the activity has become visible. */
    @Override
    protected void onResume() {
        super.onResume();
        fetchRecChartArea();
        fetchEspChartArea();
        //Log.d(msg, "The onResume() event");
        //Toast.makeText(getApplicationContext(), "The onResume() event", Toast.LENGTH_SHORT).show();
    }

    /** Called when another activity is taking focus. */
    @Override
    protected void onPause() {
        super.onPause();
        loadingPB.setVisibility(View.GONE);
        //Toast.makeText(getApplicationContext(), "The onPause() event", Toast.LENGTH_SHORT).show();
    }

    /** Called when the activity is no longer visible. */
    @Override
    protected void onStop() {
        super.onStop();
        //Log.d(msg, "The onStop() event");
        //Toast.makeText(getApplicationContext(), "The onStop() event", Toast.LENGTH_SHORT).show();
    }

    /** Called just before the activity is destroyed. */
    @Override
    public void onDestroy() {
        super.onDestroy();
        //Log.d(msg, "The onDestroy() event");
        //Toast.makeText(getApplicationContext(), "The onDestroy() event", Toast.LENGTH_SHORT).show();
    }
}
