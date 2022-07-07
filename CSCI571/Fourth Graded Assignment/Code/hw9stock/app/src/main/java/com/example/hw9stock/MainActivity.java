package com.example.hw9stock;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.coordinatorlayout.widget.CoordinatorLayout;
import androidx.recyclerview.widget.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.android.material.snackbar.Snackbar;
import com.google.gson.JsonParser;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.text.SpannableString;
import android.text.style.UnderlineSpan;
import android.util.Log;
import android.view.*;
import android.widget.*;

import androidx.appcompat.app.AlertDialog;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import java.util.Date;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicInteger;
import io.github.luizgrp.sectionedrecyclerviewadapter.SectionedRecyclerViewAdapter;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.google.gson.JsonParser;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    RecyclerView myrecyclerView;
    RecyclerView myrecyclerView1;
    RecyclerViewAdapter mAdapter;
    RecyclerViewAdapterPortfolio mAdapter1;
    ArrayList<String> stringArrayList = new ArrayList<>();
    ArrayList<String> stringArrayList1 = new ArrayList<>();
    CoordinatorLayout coordinatorLayout;
    CoordinatorLayout coordinatorLayout1;

    TextView datetextview;
    TextView footer;
    TextView networthMain;
    TextView cashBalanceMain;

    /*--------------------------------------------------------------------------------*/
    private static ArrayList<stock_obj> stockObjArrayList = new ArrayList<stock_obj>();
    private static String mainbalance = "";
    private static String mainnetworth = "";
    private static String inputSymbol;
    private static final String TAG = "MyActivity";
    private static final String msg = "Android:";
    private ProgressBar myloadingPB;
    private Object myuri = Uri.parse("https://finnhub.io/"); //https://www.tutorialkart.com/kotlin-android/android-open-url-in-browser-activity/
    /*--------------------------------------------------------------------------------*/

    public static ArrayList<stock_obj> getstockObjArrayList(){ return stockObjArrayList; }
    public static void addTostockObjArrayList(stock_obj myObject){ stockObjArrayList.add(myObject); }

    public static String getinputSymbol(){ return inputSymbol; }
    public static void setinputSymbol(String userchangeinputSymbol){ inputSymbol = userchangeinputSymbol; }

    public static String getMainbalance(){ return mainbalance; }
    public static void setMainbalance(String mymainbalance){ mainbalance = mymainbalance; }

    public static String getMainnetworth(){ return mainnetworth; }
    public static void setMainnetworth(String changemainnetworth){ mainnetworth = changemainnetworth; }

    //start activity
    private void startDetailsStockPage(String ticker) { startActivity(new Intent(MainActivity.this, stockDetailsPage.class)); }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //https://riptutorial.com/android/example/25632/multiple-themes-in-one-app
        //setTheme(R.style.Hw9Stock); //when adding this part it crashes the app
        setContentView(R.layout.activity_main);

        //Source: https://beginnersbook.com/2013/05/simple-date-format-java/
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("dd MMMM, yyyy");
        String dateString = sdf.format(date);

        datetextview = findViewById(R.id.dateToday);
        datetextview.setText(dateString);

        footer = findViewById(R.id.footerfinhub);
        footer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /*
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setData((Uri) myuri);
                view.getContext().startActivity(i);
               */
                Intent intent = new Intent(Intent.ACTION_VIEW);
                //intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.setData((Uri) myuri);
                intent.setPackage("com.android.chrome");
                try {
                    view.getContext().startActivity(intent);
                } catch (ActivityNotFoundException ex) {
                    // Chrome browser presumably not installed so allow user to choose instead
                    intent.setPackage(null);
                    view.getContext().startActivity(intent);
                }
            }
        });

        //portfolio
        myrecyclerView1 = findViewById(R.id.myrecyclerView1);
        coordinatorLayout1 = findViewById(R.id.coordinatorLayout1);
        populateRecyclerView1();
        //enableSwipeToDeleteAndUndo1(); //not needed

        //favorite
        myrecyclerView = findViewById(R.id.myrecyclerView);
        coordinatorLayout = findViewById(R.id.coordinatorLayout);
        populateRecyclerView();
        enableSwipeToDeleteAndUndo();

        //first time initalizing
        if(getMainbalance().equals("")==true){
            setMainbalance("25000");
        }

        if(getMainnetworth().equals("")==true){
            setMainnetworth("25000");
        }

        double networth = 0;
        //here populate Networth
        if (MainActivity.getstockObjArrayList().size()>0){
            for(int x = 0; x < MainActivity.getstockObjArrayList().size(); x++){
                stock_obj tmp_stock_obj = MainActivity.getstockObjArrayList().get(x);
                networth = networth + Double.parseDouble(tmp_stock_obj.getMarketValue());
            }

            networth = Double.parseDouble(getMainbalance()) + networth;
            networth = networth*100;
            networth = Math.round(networth);
            networth = networth /100;

            setMainnetworth(String.valueOf(networth));
        }

        networthMain = findViewById(R.id.NetWorthVal);
        networthMain.setText("$" + getMainnetworth());

        cashBalanceMain = findViewById(R.id.cashBalanceVal);
        cashBalanceMain.setText("$" + getMainbalance());

        //https://www.geeksforgeeks.org/toolbar-in-android-with-example/
        //This part is needed - if removed app does not show tool bar
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar); // assigning ID of the toolbar to a variable
        setSupportActionBar(toolbar);  // using toolbar as ActionBar

        myloadingPB = findViewById(R.id.mydLoadingPB);
        // inside the on response method - we are hiding our progress bar.
        //myloadingPB.setProgressTintList(ColorStateList.valueOf(Color.rgb(138,43,226)));
        myloadingPB.setVisibility(View.VISIBLE);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                myloadingPB.setVisibility(View.GONE);
            }
        }, 2000);
    }


    //https://www.journaldev.com/23164/android-recyclerview-swipe-to-delete-undo
    private void populateRecyclerView1() {

        //System.out.println("getstockObjArrayList().size(): " + getstockObjArrayList().size());
        if(getstockObjArrayList().size()>0) {
            for (int i = 0; i < getstockObjArrayList().size(); i++) {
                stock_obj tmp_obj = stockObjArrayList.get(i);
                String tmpTicker = tmp_obj.getTicker();
                String tmpsharesown = tmp_obj.getSharesOwn();

                //Boolean numshareflag = tmpsharesown.equals("0");
                //System.out.println(numshareflag);

                //Boolean numshareflag1 = tmpsharesown.equals("0.0");
                //System.out.println(numshareflag1);

                double d = Double.parseDouble(tmpsharesown);

                if((d == 0.0) || ( d == 0)){
                    continue;
                }else{
                    String totalMarketVal = tmp_obj.getMarketValue();
                    String changePricePercentnow = tmp_obj.getTotalstockPriceChnagePercentagProtfolio();
                    String addArrstr = tmpTicker + "," + tmpsharesown + " shares " + "," + totalMarketVal + "," + changePricePercentnow;
                    //String addArrstr = tmpTicker + "," + tmpsharesown + " shares " + "," + "1000" + "," + "-2.74(-5.10%)"; //testing
                    stringArrayList1.add(addArrstr);
                }
            }
        }else{
            System.out.println("getstockObjArrayList().size() < 0");
        }

        //stringArrayList1.add("AAPL,3 shares"); //debug
        //stringArrayList1.add("TSLA, 1 shares"); //debug

        mAdapter1 = new RecyclerViewAdapterPortfolio(stringArrayList1);
        myrecyclerView1.setAdapter(mAdapter1);
        //mAdapter1.removeItem(0); //debug
    }

    //not needed for portfolio
    /*
    private void enableSwipeToDeleteAndUndo1() {
        SwipeToDeleteCallback swipeToDeleteCallback = new SwipeToDeleteCallback(this) {
            @Override
            public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int i) {

                final int position = viewHolder.getAdapterPosition();
                final String item = mAdapter1.getData().get(position);

                mAdapter1.removeItem(position);

                Snackbar snackbar = Snackbar
                        .make(coordinatorLayout1, "Item was removed from the list.", Snackbar.LENGTH_LONG);
                snackbar.setAction("UNDO", new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {

                        mAdapter1.restoreItem(item, position);
                        myrecyclerView1.scrollToPosition(position);
                    }
                });

                snackbar.setActionTextColor(Color.YELLOW);
                snackbar.show();

            }
        };

        ItemTouchHelper itemTouchhelper = new ItemTouchHelper(swipeToDeleteCallback);
        itemTouchhelper.attachToRecyclerView(myrecyclerView1);
    }
    */

    private void populateRecyclerView() {

        //System.out.println("getstockObjArrayList().size(): " + getstockObjArrayList().size());
        if(getstockObjArrayList().size()>0) {
            for (int i = 0; i < getstockObjArrayList().size(); i++) {
                stock_obj tmp_obj = stockObjArrayList.get(i);

                Boolean tmp_var = tmp_obj.getWatched();

                if(tmp_var==true) {

                    String tmpTicker = tmp_obj.getTicker();
                    String tmpcompname = tmp_obj.getCompanyName();
                    String currentPrice = tmp_obj.getMostRecentStockPrice();
                    String changeSinceLastClose = tmp_obj.getStockPriceChnagePercentagLastClose();
                    String addArrstr = tmpTicker + "," + tmpcompname + "," + currentPrice + "," + changeSinceLastClose;
                    //String addArrstr = tmpTicker + "," + tmpcompname + "," + "32" + "," + "-2.74(-5.10%)"; //testing

                    stringArrayList.add(addArrstr);
                }

                mAdapter = new RecyclerViewAdapter(stringArrayList);
                myrecyclerView.setAdapter(mAdapter);

                //not needed
                /*
                if(tmp_var==false){
                    if(stringArrayList.size()>0){
                        for (int counter = 0; counter < stringArrayList.size(); counter++) {
                            String myStr = stringArrayList.get(counter);
                            if(myStr.contains(tmp_obj.getTicker())==true){
                                //stringArrayList1.remove(counter);
                                mAdapter.removeItem(counter);
                            }
                        }
                    }
                }
               */

            }
        }else{
            System.out.println("getstockObjArrayList().size() < 0");
        }

        //stringArrayList.add("TSLA, TESLA INC");
        //stringArrayList.add("AAPL, APPLE INC");

        //mAdapter = new RecyclerViewAdapter(stringArrayList);
        //myrecyclerView.setAdapter(mAdapter);
        //mAdapter.removeItem(0); //debug
    }

    private void enableSwipeToDeleteAndUndo() {
        SwipeToDeleteCallback swipeToDeleteCallback = new SwipeToDeleteCallback(this) {
            @Override
            public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int i) {

                final int position = viewHolder.getAdapterPosition();
                final String item = mAdapter.getData().get(position);
                //System.out.println(item);

                String[] arrOfStr = item.split(",");
                String tmpTickerStr = arrOfStr[0];

                for (int j = 0; j < MainActivity.getstockObjArrayList().size(); j++){
                    stock_obj tmp_obj = MainActivity.stockObjArrayList.get(j);
                    if(tmpTickerStr.equals(tmp_obj.getTicker())==true){
                        MainActivity.stockObjArrayList.get(j).setWatched(false);
                    }
                }

                mAdapter.removeItem(position);

                Snackbar snackbar = Snackbar
                        .make(coordinatorLayout, "Item was removed from the list.", Snackbar.LENGTH_LONG);
                snackbar.setAction("UNDO", new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {

                        mAdapter.restoreItem(item, position);
                        myrecyclerView.scrollToPosition(position);
                    }
                });

                snackbar.setActionTextColor(Color.YELLOW);
                snackbar.show();

            }
        };

        ItemTouchHelper itemTouchhelper = new ItemTouchHelper(swipeToDeleteCallback);
        itemTouchhelper.attachToRecyclerView(myrecyclerView);
    }

    public void getAutoComList(final VolleyCallback callback) {

        //ArrayList<String> mydataArr = new ArrayList<String>();
        // https://google.github.io/volley/request.html
        // creating a new variable for our request queue
        RequestQueue queue = Volley.newRequestQueue(MainActivity.this);
        //System.out.println(">>>>>getAutoComList inputSymbol:" + inputSymbol);
        //String url =  "https://ehsankhalighstock.uw.r.appspot.com/api/v0/Autocomplete/" + inputSymbol;
        String url =   "https://ehsankhalighstock0.wm.r.appspot.com" + "/api/v0/Autocomplete/" + inputSymbol; //used during HW8 regrade to avoid hitting limit

        // as our data is in json object format so we are using
        // json object request to make data request from our url.
        // in below line we are making a json object
        // request and creating a new json object request.
        // inside our json object request we are calling a
        // method to get the data, "url" from where we are
        // calling our data,"null" as we are not passing any data.
        // later on we are calling response listener method
        // to get the response from our API.

        JsonArrayRequest jsonObjectRequest = new JsonArrayRequest
                (Request.Method.GET, url, null, new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray response) {
                        //System.out.println("response:" + response);
                        JSONObject jsonObj = new JSONObject();
                        // populate the array
                        try {
                            jsonObj.put("arrayName",response);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        callback.onSuccess(jsonObj.toString());
                    }

                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // TODO: Handle error
                        System.out.println("Error....");
                        System.out.println(error);
                    }
                });

        // queue to fetch all the json data.
        queue.add(jsonObjectRequest);
    }

    @SuppressLint("RestrictedApi")
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        //Source: https://www.dev2qa.com/android-actionbar-searchview-autocomplete-example/
        // Inflate the search menu action bar.
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.action_bar_search_example_menu, menu);

        MenuItem searchMenu = menu.findItem(R.id.app_bar_menu_search);
        SearchView searchView = (SearchView) searchMenu.getActionView();
        final SearchView.SearchAutoComplete searchAutoComplete = searchView.findViewById(androidx.appcompat.R.id.search_src_text);
        searchAutoComplete.setThreshold(1); //https://stackoverflow.com/questions/35229412/searchview-hints-not-showing-for-single-character-typed
        searchAutoComplete.setPaintFlags(searchAutoComplete.getPaintFlags() |  Paint.UNDERLINE_TEXT_FLAG); //https://stackoverflow.com/questions/2394935/can-i-underline-text-in-an-android-layout

       // Create a new ArrayAdapter and add data to search auto complete object.
        //String dataArr[] = {"Apple" , "Amazon" , "Amd", "Microsoft", "Microwave", "MicroNews", "Intel", "Intelligence"};
        ArrayList<String> mydataArr = new ArrayList<String>();

        //System.out.println(">> Before: inputSymbol:" + inputSymbol);
        if((inputSymbol != null) && (inputSymbol != "") && (inputSymbol != " ")) {
            //System.out.println(">> After: inputSymbol.isEmpty():" + inputSymbol.isEmpty());
            //System.out.println(">> After: inputSymbol:" + inputSymbol);

            if (inputSymbol.isEmpty() == false) {
                ///System.out.println(">> After: in progress ....");
                //https://stackoverflow.com/questions/28120029/how-can-i-return-value-from-function-onresponse-of-volley
                getAutoComList(new VolleyCallback(){
                    @Override
                    public void onSuccess(String result){

                        //System.out.println(">>>>result:" + result);
                        //mydataArr.add("AAPL"); //debug - Testing
                        //mydataArr.add("INTC"); //debug - Testing
                        //mydataArr.add("TSLA"); //debug - Testing
                        //System.out.println("***mydataArr:" + mydataArr.toString());

                       try {
                           JSONObject jsonObject = new JSONObject(result);
                           //System.out.println("***jsonObject.get(\"arrayName\"):" + jsonObject.get("arrayName"));

                           //https://stackoverflow.com/questions/15609306/convert-string-to-json-array
                           java.util.Iterator<String> iter = jsonObject.keys();
                           while (iter.hasNext()) {
                               String key = iter.next();
                               try {
                                   Object value = jsonObject.get(key);
                                   //System.out.println("***value:" + value.toString());
                                   JSONArray myjsonArray1 = new JSONArray(value.toString());

                                   //System.out.println(">>***mmyjsonArray.length():" + myjsonArray1.length());

                                   for (int i=0;i< myjsonArray1.length();i++) {
                                           JSONObject myitemObject = myjsonArray1.getJSONObject(i);
                                           //System.out.println("***explrObject:" + myitemObject.toString());
                                           String description = myitemObject.getString("description");
                                           String displaySymbol = myitemObject.getString("displaySymbol");
                                           //System.out.println("***description:" + description);
                                           //System.out.println("***displaySymbol:" + displaySymbol);
                                           mydataArr.add(description + " | " + displaySymbol);
                                   }

                               } catch (JSONException e) {
                                   // Something went wrong!
                               }
                           }

                       }catch (JSONException err){
                            Log.d("Error", err.toString());
                       }
                        //System.out.println("***After mydataArr:" + mydataArr.toString());
                        ArrayAdapter<String> newsAdapter = new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple_dropdown_item_1line, mydataArr);
                        searchAutoComplete.setAdapter(newsAdapter);
                        // Listen to search view item on click event.
                        searchAutoComplete.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                            @Override
                            public void onItemClick(AdapterView<?> adapterView, View view, int itemIndex, long id) {
                                String queryString=(String)adapterView.getItemAtPosition(itemIndex);
                                String[] arrOfStr =  queryString.split("\\|");

                                SpannableString content = new SpannableString(arrOfStr[1].replaceAll("\\s", ""));
                                content.setSpan(new UnderlineSpan(), 0, content.length(), 0);
                                searchAutoComplete.setText(content);

                                //searchAutoComplete.setText(arrOfStr[1].replaceAll("\\s", "")); //original

                                startDetailsStockPage(arrOfStr[1].replaceAll("\\s", ""));
                                //Toast.makeText(MainActivity.this, "you clicked " + arrOfStr[1], Toast.LENGTH_LONG).show();
                            }
                        });

                    }
                });
            }
        }


        // Below event is triggered when submit search query.
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                //AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create(); //debug
                //alertDialog.setMessage("Search keyword is " + query); //debug
                //alertDialog.show(); //debug
                startDetailsStockPage(query);
                return false;
            }
            @Override
            public boolean onQueryTextChange(String newText) {
                inputSymbol = newText;
                onCreateOptionsMenu(menu);
                return false;
            }
        });

        return super.onCreateOptionsMenu(menu);

    }

    /** Called when the activity is about to become visible. */
    @Override
    protected void onStart() {
        super.onStart();
        /*
        Log.d(msg, "**The onStart() event");
        Toast.makeText(getApplicationContext(),
                "**The onStart() event", Toast.LENGTH_SHORT).show();
         */
    }

    /** Called when the activity has become visible. */
    @Override
    protected void onResume() {
        super.onResume();
        /*
        Log.d(msg, "**The onResume() event");
        Toast.makeText(getApplicationContext(),
                "**The onResume() event", Toast.LENGTH_SHORT).show();
         */
    }

    /** Called when another activity is taking focus. */
    @Override
    protected void onPause() {
        super.onPause();
        /*
        Log.d(msg, "**The onPause() event");
        Toast.makeText(getApplicationContext(),
                "**The onPause() event", Toast.LENGTH_SHORT).show();
         */
    }

    /** Called when the activity is no longer visible. */
    @Override
    protected void onStop() {
        super.onStop();
        /*
        Log.d(msg, "**The onStop() event");
        Toast.makeText(getApplicationContext(),
                "**The onStop() event", Toast.LENGTH_SHORT).show();
         */
    }

    /** Called just before the activity is destroyed. */
    @Override
    public void onDestroy() {
        super.onDestroy();
        /*
        Log.d(msg, "**The onDestroy() event");
        Toast.makeText(getApplicationContext(),
                "**The onDestroy() event", Toast.LENGTH_SHORT).show();
         */
    }

    public interface VolleyCallback{
        void onSuccess(String result);
    }
}
