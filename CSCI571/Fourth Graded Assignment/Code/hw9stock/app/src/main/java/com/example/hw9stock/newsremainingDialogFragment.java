package com.example.hw9stock;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class newsremainingDialogFragment extends androidx.fragment.app.DialogFragment{

    private ImageView twittericon;
    private ImageView facebookIcon;
    private ImageView chromeicon;
    public View view;

    String news_detail;
    String news_source;
    String news_url;
    String news_date;
    String news_headline;

    public newsremainingDialogFragment(String news_detail, String news_source, String news_url, String news_date, String news_headline) {
        this.news_detail = news_detail;
        this.news_source = news_source;
        this.news_url = news_url;
        this.news_date = news_date;
        this.news_headline = news_headline;
    }

    public String getNewsURL(){
        return this.news_url;
    }

    public String getHeader(){
        return this.news_headline;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.news_dialog_view,container,false);
        setView(view);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        chromeicon =  view.findViewById(R.id.chrome_open);
        facebookIcon =  view.findViewById(R.id.facebook_share);
        twittericon =  view.findViewById(R.id.twitter_share);

        chromeicon.setOnClickListener(new View.OnClickListener() {
            private String news_url;

            @Override
            public void onClick(View view) {
                /*
                Intent i = new Intent(Intent.ACTION_VIEW);
                //Object chrome_URL = Uri.parse(stockDetailsPage.topNewurl);
                Object chrome_URL = Uri.parse(getNewsURL());
                i.setData((Uri) chrome_URL);
                view.getContext().startActivity(i);
                */

                Intent intent = new Intent(Intent.ACTION_VIEW,Uri.parse(getNewsURL()));
                //intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
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

        facebookIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                Intent i = new Intent(Intent.ACTION_VIEW);
                Object facebook_URL = Uri.parse(setFBshareURL());
                i.setData((Uri) facebook_URL);
                view.getContext().startActivity(i);
                */
                Intent intent = new Intent(Intent.ACTION_VIEW,Uri.parse(setFBshareURL()));
                //intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
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

        twittericon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                Intent i = new Intent(Intent.ACTION_VIEW);
                Object twitter_URL = Uri.parse(setTwittershareURL());
                i.setData((Uri) twitter_URL);
                view.getContext().startActivity(i);
                */
                Intent intent = new Intent(Intent.ACTION_VIEW,Uri.parse(setTwittershareURL()));
                //intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
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
    }

    private void setView(View view) {
        TextView nsource  = view.findViewById(R.id.news_source);
        TextView ndate  = view.findViewById(R.id.news_date);
        TextView ndetail  = view.findViewById(R.id.news_detail);

        //https://stackoverflow.com/questions/17432735/convert-unix-timestamp-to-date-in-java
        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("MMMM dd, yyyy");

        long unixTime = Long.parseLong(this.news_date);
        String formattedDtm = Instant.ofEpochSecond(unixTime)
                .atZone(ZoneId.of("GMT-5"))
                .format(formatter);

        nsource.setText(this.news_source);
        ndate.setText(formattedDtm);
        ndetail.setText(this.news_detail);
    }

    private String setFBshareURL(){
        String url = null;
        try {
            url = "https://www.facebook.com/sharer/sharer.php?u=" + URLEncoder.encode(getNewsURL(), "UTF-8") + "&quote=" + URLEncoder.encode(getHeader(), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return url;
    }

    private String setTwittershareURL(){
        String url = null;
        try {
            url = "https://twitter.com/intent/tweet?text=" + URLEncoder.encode(getHeader(), "UTF-8") + "&url="+ URLEncoder.encode(getNewsURL(), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return url;
    }
}
