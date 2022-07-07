package com.example.hw9stock;

import android.content.Context;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import com.squareup.picasso.Picasso;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;

public class NewsAdapter extends RecyclerView.Adapter<NewsAdapter.Viewholder> {

    private Context context;
    private ArrayList<newsModel> newsModelArrayList;

    // Constructor
    public NewsAdapter(Context context, ArrayList<newsModel> newsModelArrayList) {
        this.context = context;
        this.newsModelArrayList = newsModelArrayList;
    }

    @NonNull
    @Override
    public NewsAdapter.Viewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // to inflate the layout for each item of recycler view.
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.remaining_news_items, parent, false);
        return new NewsAdapter.Viewholder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull Viewholder holder, int position) {
        // to set data to textview and imageview of each card layout
        newsModel model = newsModelArrayList.get(position);
        holder.newsheadline.setText(model.getNews_headline());
        holder.newssourcedate.setText(model.getNews_source());

        LocalDate ld = Instant.ofEpochMilli(Long.parseLong(model.getNews_date())).atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate now = LocalDate.now();
        LocalDate behind = ld;
        Period period = Period.between(now, behind);
        int diff = period.getDays() * (-1);
        String s = Integer.toString(diff);

        holder.newshoursago.setText(s + " hours ago\n");

        holder.mynewsImg.setVisibility(View.VISIBLE);
        Picasso.get().load(model.getNews_imgURL()).into(holder.mynewsImg);

        Context itemContext = holder.newsView.getContext();
        holder.newsView.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                newsremainingDialogFragment dialogFragment = new newsremainingDialogFragment(model.getNews_detail(), model.getNews_source(), model.getNews_url(), model.getNews_date(),model.getNews_headline());
                dialogFragment.show(((AppCompatActivity) itemContext).getSupportFragmentManager(), "NewsShareDialog");
            }
        });
    }

    @Override
    public int getItemCount() {
        // this method is used for showing number
        // of card items in recycler view.
        return newsModelArrayList.size();
    }

    // View holder class for initializing of
    // your views such as TextView and Imageview.
    public class Viewholder extends RecyclerView.ViewHolder {
        View newsView;
        private ImageView mynewsImg;
        private TextView newssourcedate, newsheadline, newshoursago;

        public Viewholder(@NonNull View itemView) {
            super(itemView);
            newsView = itemView;
            mynewsImg = (ImageView) itemView.findViewById(R.id.newsotherimage);
            newssourcedate = (TextView) itemView.findViewById(R.id.newsothersourcedate);
            newsheadline = (TextView) itemView.findViewById(R.id.newsotherheadlin);
            newshoursago = (TextView) itemView.findViewById(R.id.newsotherhoursago);
        }
    }
}
