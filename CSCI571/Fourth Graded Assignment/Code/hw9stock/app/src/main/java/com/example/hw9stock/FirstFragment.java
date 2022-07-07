package com.example.hw9stock;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
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
import android.os.Bundle;
import android.text.util.Linkify;
import android.util.Log;
import android.view.*;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.core.text.HtmlCompat;
import androidx.viewpager.widget.ViewPager;

import android.text.Spanned;
import android.widget.*;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import java.util.ArrayList;
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

/*
    https://stackoverflow.com/questions/55285496/how-to-add-webview-in-fragments
    https://stackoverflow.com/questions/31159149/using-webview-in-fragment
    https://stackoverflow.com/questions/25329275/the-method-getapplicationcontext-is-undefined-fragment-issues
    https://stackoverflow.com/questions/64342158/cannot-resolve-class-android-support-constraint-constraintlayout
    https://hmkcode.com/android/android-creating-swipe-views-tabs/
*/

public class FirstFragment extends Fragment{
    public WebView mWebView;

    public FirstFragment() {}

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @SuppressLint("ResourceType")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View v=inflater.inflate(R.layout.stock_historical_details_chart, container, false);
        mWebView = (WebView) v.findViewById(R.id.historical_chart);

        // Enable Javascript
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        mWebView.clearCache(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowFileAccess(true);
        mWebView.setWebViewClient(new WebViewClient());

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                String uppercaseticker = "\"" + MainActivity.getinputSymbol().toUpperCase() + "\"";
                //Toast.makeText(getActivity().getApplicationContext(), "fetching historical charts data ...", Toast.LENGTH_SHORT).show();
                view.loadUrl("javascript:getdetailsHistoricalChart("+uppercaseticker+", \"https://ehsankhalighstock.uw.r.appspot.com/api/v0/CompanyHistoricalData/"+MainActivity.getinputSymbol()+"\")");
                //Toast.makeText(getActivity().getApplicationContext(), "Done!", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                //Toast.makeText(getActivity().getApplicationContext(), "Oh no! " + description, Toast.LENGTH_SHORT).show();
            }
        });

        mWebView.loadUrl("file:///android_asset/main.html");
        return v;
    }
}

