package com.example.hw9stock;

import android.content.Intent;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class RecyclerViewAdapterPortfolio extends RecyclerView.Adapter<RecyclerViewAdapterPortfolio.MyViewHolder> {

    private ArrayList<String> data;

    public class MyViewHolder extends RecyclerView.ViewHolder {

        private TextView mTitle;
        private TextView numshareown;
        private TextView totalMarketValue;
        private TextView marketValuePriceChangenPercent;
        private ImageView arrow;
        private ImageView trendImg;

        RelativeLayout relativeLayout;

        public MyViewHolder(View itemView) {
            super(itemView);

            mTitle = itemView.findViewById(R.id.txtTitlePro);
            numshareown = itemView.findViewById(R.id.numShareOwnPro);
            totalMarketValue = itemView.findViewById(R.id.total_market_valPro);
            marketValuePriceChangenPercent = itemView.findViewById(R.id.amount_change_mainPro);
            arrow = itemView.findViewById(R.id.arrow_mainPro);
            trendImg = itemView.findViewById(R.id.trendimg_mainPro);
        }
    }

    public RecyclerViewAdapterPortfolio(ArrayList<String> data) {
        this.data = data;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.cardview_row_portfolio, parent, false);
        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        String mystr = data.get(position);
        String[] arrOfStr = mystr.split(",");
        holder.mTitle.setText(arrOfStr[0]);
        holder.numshareown.setText(arrOfStr[1]);

        holder.totalMarketValue.setText("$" + arrOfStr[2]);
        holder.marketValuePriceChangenPercent.setText("$" + arrOfStr[3]);

        if(arrOfStr[3].contains("-")){
            holder.trendImg.setImageResource(R.drawable.ic_trending_down);
            holder.marketValuePriceChangenPercent.setTextColor(Color.parseColor("#FC0000"));
        }else if(arrOfStr[3].contains("0.0")){
            holder.marketValuePriceChangenPercent.setTextColor(Color.parseColor("#FF8E8B8E"));
        }else {
            holder.trendImg.setImageResource(R.drawable.ic_trending_up);
            holder.marketValuePriceChangenPercent.setTextColor(Color.parseColor("#34B034"));
        }

        holder.arrow.setImageResource(R.drawable.chevron_right);

        holder.arrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(), stockDetailsPage.class);
                v.getContext().startActivity(intent);
                MainActivity.setinputSymbol(arrOfStr[0]);
                v.getContext().startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return data.size();
    }


    public void removeItem(int position) {
        data.remove(position);
        notifyItemRemoved(position);
    }

    public void restoreItem(String item, int position) {
        data.add(position, item);
        notifyItemInserted(position);
    }

    public ArrayList<String> getData() {
        return data;
    }
}



