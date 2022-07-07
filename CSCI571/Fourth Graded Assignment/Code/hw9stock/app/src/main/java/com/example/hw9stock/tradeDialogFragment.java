package com.example.hw9stock;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.icu.number.Precision;
import android.net.Uri;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class tradeDialogFragment extends androidx.fragment.app.DialogFragment{

    public View myview;
    public View poerfolioView;
    EditText editText;
    TextView total_cost;
    TextView balance_left;
    TextView top_msg;
    TextView shares_owned_new, abg_cost_new, total_cost_new, change_new;

    AppCompatButton sellbtn;
    AppCompatButton buybtn;
    double total_double;
    private OnTextLayerCallback callback;

    public static String buySellDialogString;
    public static String sharenumboughtsoldString;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        myview = inflater.inflate(R.layout.trade_dialog,container,false);
        setView(myview);
        return myview;
    }

    //https://github.com/uptechteam/MotionViews-Android/blob/master/app/src/main/java/team/uptech/motionviews/ui/TextEditorDialogFragment.java
    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        editText = (EditText) view.findViewById(R.id.trade_input);
        editText.setText("0"); //needed
        editText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                double input_double;
                double price;
                if (editText.getText().toString().equals("")){
                     input_double = 0;
                     price = Double.parseDouble(stockDetailsPage.currentstockprice);
                     total_double = input_double * price;
                }else {
                    input_double = Double.parseDouble(editText.getText().toString());
                    price = Double.parseDouble(stockDetailsPage.currentstockprice);
                    total_double = input_double * price;
                }
                total_double = total_double*100;
                total_double = Math.round(total_double);
                total_double = total_double /100;
                String total = String.valueOf(total_double);
                sharenumboughtsoldString = editText.getText().toString();
                total_cost.setText(editText.getText().toString() + "*" + stockDetailsPage.currentstockprice +"/Share = " + total);
            }

            @Override
            public void afterTextChanged(Editable s) {
                if (callback != null) {
                    callback.textChanged(s.toString());
                }
            }
        });

        buybtn = view.findViewById(R.id.detail_trade_buy);
        buybtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String current_balance = MainActivity.getMainbalance();
                double current_balance_double = Double.parseDouble(current_balance);

                boolean isEmpty = sharenumboughtsoldString == null || sharenumboughtsoldString.trim().length() == 0;

                if (isEmpty) {
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                } else if((sharenumboughtsoldString == null) || (sharenumboughtsoldString.trim().isEmpty())) {
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                } else if(sharenumboughtsoldString.matches("[a-zA-Z]+")) {
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                }else if(current_balance_double < total_double){
                    Toast.makeText(getActivity(), "Not enough money to buy", Toast.LENGTH_LONG).show();
                } else if(sharenumboughtsoldString.equals("0") == true){
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                }else {
                    //https://stackoverflow.com/questions/16540186/show-dialogfragment-from-another-dialogfragment
                    tradeCongratsDialogFragment newDialogFragment = new tradeCongratsDialogFragment();
                    FragmentTransaction transaction = getActivity().getSupportFragmentManager().beginTransaction();
                    newDialogFragment.show(transaction, "New_Dialog_Fragment");
                    buySellDialogString = "bought";

                    String current_shares_owned = stockDetailsPage.current_page_stock_obj.getSharesOwn();
                    String current_avg_cost = stockDetailsPage.current_page_stock_obj.getAvgCost();
                    String current_total_cost = stockDetailsPage.current_page_stock_obj.getTotalCost();
                    String current_market_value = stockDetailsPage.current_page_stock_obj.getMarketValue();

                    double current_shares_owned_d = Double.parseDouble(current_shares_owned);
                    double current_avg_cost_d = Double.parseDouble(current_avg_cost);
                    double current_total_cost_d = Double.parseDouble(current_total_cost);
                    double current_market_value_d = Double.parseDouble(current_market_value);

                    double current_user_req_buy_d = Double.parseDouble(sharenumboughtsoldString);
                    double current_stock_price_d = Double.parseDouble(stockDetailsPage.currentstockprice);

                    //shares_owned_new, abg_cost_new, total_cost_new, change_new
                    double new_total_shares_owned = current_shares_owned_d + current_user_req_buy_d;
                    double new_avg_share = (current_total_cost_d + (current_user_req_buy_d*current_stock_price_d))/(new_total_shares_owned);
                    double new_total_cost = (current_user_req_buy_d * current_stock_price_d) + current_total_cost_d;

                    double new_market_value = new_total_shares_owned * current_stock_price_d;
                    double new_change;

                    if(current_market_value_d != 0.0) {
                         new_change = new_total_cost - new_market_value;
                    }else{
                         new_change = 0;
                    }

                    new_avg_share = new_avg_share*100;
                    new_avg_share = Math.round(new_avg_share);
                    new_avg_share = new_avg_share /100;

                    new_market_value = new_market_value*100;
                    new_market_value = Math.round(new_market_value);
                    new_market_value = new_market_value /100;

                    new_total_cost = new_total_cost*100;
                    new_total_cost = Math.round(new_total_cost);
                    new_total_cost = new_total_cost /100;

                    new_change = new_change*100;
                    new_change = Math.round(new_change);
                    new_change = new_change /100;

                    double new_transaction_total_cost_buy_now = current_user_req_buy_d * current_stock_price_d;
                    double new_balance = current_balance_double - new_transaction_total_cost_buy_now;

                    new_transaction_total_cost_buy_now = new_transaction_total_cost_buy_now*100;
                    new_transaction_total_cost_buy_now = Math.round(new_transaction_total_cost_buy_now);
                    new_transaction_total_cost_buy_now = new_transaction_total_cost_buy_now /100;

                    new_balance = new_balance*100;
                    new_balance = Math.round(new_balance);
                    new_balance = new_balance /100;

                    MainActivity.setMainbalance(Double.toString(new_balance));


                    double percentDiff = ((new_change)/((new_total_cost + new_market_value)/2))*100;
                    if (new_total_cost > new_market_value){
                        percentDiff = percentDiff * (-1);
                    }

                    String percentDiffStr = Double.toString(percentDiff);
                    String portfolioChangePercent = Double.toString(new_change) + "(" + percentDiffStr + "%)";
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setTotalstockPriceChnagePercentagProtfolio(portfolioChangePercent);


                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setSharesOwn(Double.toString(new_total_shares_owned));
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setAvgCost(Double.toString(new_avg_share));
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setTotalCost(Double.toString(new_total_cost));
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setMarketValue(Double.toString(new_market_value));

                    /*
                    stockDetailsPage.current_page_stock_obj.setSharesOwn(Double.toString(new_total_shares_owned));
                    stockDetailsPage.current_page_stock_obj.setAvgCost(Double.toString(new_avg_share));
                    stockDetailsPage.current_page_stock_obj.setTotalCost(Double.toString(new_total_cost));
                    stockDetailsPage.current_page_stock_obj.setMarketValue(Double.toString(new_market_value));
                    */


                    if(new_change > 0){
                        stockDetailsPage.changeval.setTextColor(Color.GREEN);
                        stockDetailsPage.marketval.setTextColor(Color.GREEN);
                    }else if(new_change < 0){
                        stockDetailsPage.changeval.setTextColor(Color.RED);
                        stockDetailsPage.marketval.setTextColor(Color.RED);
                    }else{
                        stockDetailsPage.changeval.setTextColor(Color.BLACK);
                        stockDetailsPage.marketval.setTextColor(Color.BLACK);
                    }

                    //sharedonwed, avgcost, totalcost, changeval, marketval;
                    stockDetailsPage.avgcost.setText("$" + Double.toString(new_avg_share));
                    stockDetailsPage.sharedonwed.setText(Double.toString(new_total_shares_owned));
                    stockDetailsPage.totalcost.setText("$" + Double.toString(new_total_cost));
                    stockDetailsPage.changeval.setText("$" + Double.toString(new_change));
                    stockDetailsPage.marketval.setText("$" + Double.toString(new_market_value));

                    dismiss();
                }
            }
        });

        sellbtn = view.findViewById(R.id.detail_trade_sell);
        sellbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String numsharesown = stockDetailsPage.current_page_stock_obj.getSharesOwn();
                double numsharesownInt = Double.parseDouble(numsharesown);
                double sharenumboughtsoldDouble = 0;

                boolean isEmpty = sharenumboughtsoldString == null || sharenumboughtsoldString.trim().length() == 0;

                if(sharenumboughtsoldString != null){
                    sharenumboughtsoldDouble = Double.parseDouble(sharenumboughtsoldString);
                }

                if (isEmpty) {
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                } else if((sharenumboughtsoldString == null) || (sharenumboughtsoldString.trim().isEmpty())) {
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                } else if(sharenumboughtsoldString.matches("[a-zA-Z]+")) {
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                }else if(sharenumboughtsoldString.equals("0") == true){
                    Toast.makeText(getActivity(), "please enter a valid amount", Toast.LENGTH_LONG).show();
                }else if(sharenumboughtsoldDouble > numsharesownInt){
                    Toast.makeText(getActivity(), "Not enough shares to sell", Toast.LENGTH_LONG).show();
                } else {
                    //https://stackoverflow.com/questions/16540186/show-dialogfragment-from-another-dialogfragment
                    tradeCongratsDialogFragment newDialogFragment = new tradeCongratsDialogFragment();
                    FragmentTransaction transaction = getActivity().getSupportFragmentManager().beginTransaction();
                    newDialogFragment.show(transaction, "New_Dialog_Fragment");
                    buySellDialogString = "sold";

                    String current_shares_owned = stockDetailsPage.current_page_stock_obj.getSharesOwn();
                    String current_avg_cost = stockDetailsPage.current_page_stock_obj.getAvgCost();
                    String current_total_cost = stockDetailsPage.current_page_stock_obj.getTotalCost();
                    String current_market_value = stockDetailsPage.current_page_stock_obj.getMarketValue();

                    double current_shares_owned_d = Double.parseDouble(current_shares_owned);
                    double current_avg_cost_d = Double.parseDouble(current_avg_cost);
                    double current_total_cost_d = Double.parseDouble(current_total_cost);
                    double current_market_value_d = Double.parseDouble(current_market_value);

                    double current_user_req_sell_d = Double.parseDouble(sharenumboughtsoldString);
                    double current_stock_price_d = Double.parseDouble(stockDetailsPage.currentstockprice);

                    //shares_owned_new, total_cost_new, total_cost_new, change_new
                    double new_total_shares_owned = current_shares_owned_d - current_user_req_sell_d;
                    double total_cost_sold = current_user_req_sell_d * current_stock_price_d;
                    double new_total_cost = current_total_cost_d - total_cost_sold;
                    double new_avg_share = new_total_cost/new_total_shares_owned;

                    double new_market_value = new_total_shares_owned * current_stock_price_d;
                    double new_change;

                    if(new_market_value != 0.0) {
                        new_change = new_total_cost - new_market_value;
                    }else{
                        new_change = 0;
                    }

                    new_avg_share = new_avg_share*100;
                    new_avg_share = Math.round(new_avg_share);
                    new_avg_share = new_avg_share /100;

                    new_total_cost = new_total_cost*100;
                    new_total_cost = Math.round(new_total_cost);
                    new_total_cost = new_total_cost /100;

                    new_change = new_change*100;
                    new_change = Math.round(new_change);
                    new_change = new_change /100;

                    new_market_value = new_market_value*100;
                    new_market_value = Math.round(new_market_value);
                    new_market_value = new_market_value /100;


                    double new_balance = total_cost_sold + Double.parseDouble(MainActivity.getMainbalance());

                    new_balance = new_balance*100;
                    new_balance = Math.round(new_balance);
                    new_balance = new_balance /100;

                    MainActivity.setMainbalance(Double.toString(new_balance));


                    double percentDiff = ((new_change)/((new_total_cost + new_market_value)/2))*100;
                    if (new_total_cost > new_market_value){
                        percentDiff = percentDiff * (-1);
                    }
                    String percentDiffStr = Double.toString(percentDiff);
                    String portfolioChangePercent = Double.toString(new_change) + "(" + percentDiffStr + "%)";
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setTotalstockPriceChnagePercentagProtfolio(portfolioChangePercent);

                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setSharesOwn(Double.toString(new_total_shares_owned));
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setAvgCost(Double.toString(new_avg_share));
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setTotalCost(Double.toString(new_total_cost));
                    MainActivity.getstockObjArrayList().get(stockDetailsPage.arrayListsrockIndexnum).setMarketValue(Double.toString(new_market_value));
                    /*
                    stockDetailsPage.current_page_stock_obj.setSharesOwn(Double.toString(new_total_shares_owned));
                    stockDetailsPage.current_page_stock_obj.setAvgCost(Double.toString(new_avg_share));
                    stockDetailsPage.current_page_stock_obj.setTotalCost(Double.toString(new_total_cost));
                    stockDetailsPage.current_page_stock_obj.setMarketValue(Double.toString(new_market_value));
                    */

                    //sharedonwed, avgcost, totalcost, changeval, marketval;
                    stockDetailsPage.avgcost.setText("$" + Double.toString(new_avg_share));
                    stockDetailsPage.sharedonwed.setText(Double.toString(new_total_shares_owned));
                    stockDetailsPage.totalcost.setText("$" + Double.toString(new_total_cost));
                    stockDetailsPage.changeval.setText("$" + Double.toString(new_change));
                    stockDetailsPage.marketval.setText("$" + Double.toString(new_market_value));

                    dismiss();
                }
            }
        });
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
    }

    private void setView(View view) {
        top_msg  = view.findViewById(R.id.trade_title_dialog);
        total_cost  = view.findViewById(R.id.buy_sell_summary);
        balance_left  = view.findViewById(R.id.detail_trade_balance);

        top_msg.setText("Trade " + stockDetailsPage.companyName + " Shares");
        total_cost.setText("0" + "*" + stockDetailsPage.currentstockprice +"/Share = 0");
        balance_left.setText(MainActivity.getMainbalance() + " to buy " + stockDetailsPage.stockticker);
    }

    public interface OnTextLayerCallback {
        void textChanged(@NonNull String text);
    }

}
