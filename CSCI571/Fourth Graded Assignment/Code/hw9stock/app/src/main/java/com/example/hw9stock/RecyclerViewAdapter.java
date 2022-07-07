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
import java.util.List;

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.MyViewHolder> {

    private ArrayList<String> data;

    public class MyViewHolder extends RecyclerView.ViewHolder {

        private TextView mTitle;
        private TextView compName;
        private TextView currentPrice;
        private TextView pricePercentChange;
        private ImageView myarrow, trendImg;

        RelativeLayout relativeLayout;

        public MyViewHolder(View itemView) {
            super(itemView);

            mTitle = itemView.findViewById(R.id.txtTitle);
            compName = itemView.findViewById(R.id.company_name_main);
            currentPrice = itemView.findViewById(R.id.stock_price_main);
            pricePercentChange = itemView.findViewById(R.id.amount_change_main);
            myarrow = itemView.findViewById(R.id.arrow_main);
            trendImg = itemView.findViewById(R.id.trendimg_main);

        }
    }

    public RecyclerViewAdapter(ArrayList<String> data) {
        this.data = data;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.cardview_row, parent, false);
        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        String mystr = data.get(position);
        String[] arrOfStr = mystr.split(",");
        holder.mTitle.setText(arrOfStr[0]);
        holder.compName.setText(arrOfStr[1]);

        holder.currentPrice.setText("$" + arrOfStr[2]);
        holder.pricePercentChange.setText("$" + arrOfStr[3]);

        if(arrOfStr[3].contains("-")){
            holder.trendImg.setImageResource(R.drawable.ic_trending_down);
            holder.pricePercentChange.setTextColor(Color.parseColor("#FC0000"));
        }else if(arrOfStr[3].contains("0.0")){
            holder.pricePercentChange.setTextColor(Color.parseColor("#FF8E8B8E"));
        }else {
            holder.trendImg.setImageResource(R.drawable.ic_trending_up);
            holder.pricePercentChange.setTextColor(Color.parseColor("#34B034"));
        }

        holder.myarrow.setImageResource(R.drawable.chevron_right);
        holder.myarrow.setOnClickListener(new View.OnClickListener() {
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



