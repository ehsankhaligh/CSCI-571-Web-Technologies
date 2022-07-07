package com.example.hw9stock;

import android.content.Context;
import android.content.Intent;
import android.graphics.Paint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;

public class peersAdapter extends RecyclerView.Adapter<peersAdapter.Viewholder> {

    private Context context;
    private ArrayList<peersModel> peerModelArrayList;

    // Constructor
    public peersAdapter(Context context, ArrayList<peersModel> peerModelArrayList) {
        this.context = context;
        this.peerModelArrayList = peerModelArrayList;
    }

    @NonNull
    @Override
    public peersAdapter.Viewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // to inflate the layout for each item of recycler view.
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.stock_comp_peers, parent, false);
        return new peersAdapter.Viewholder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull Viewholder holder, int position) {
        peersModel model = peerModelArrayList.get(position);

        holder.peerTextView.setPaintFlags( holder.peerTextView.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);
        holder.peerTextView.setText(model.getCompanypeer());

        Context itemContext = holder.peerView.getContext();
        holder.peerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(), stockDetailsPage.class);
                v.getContext().startActivity(intent);
                String newTicker = holder.peerTextView.getText().toString();
                MainActivity.setinputSymbol(newTicker);
                v.getContext().startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        // this method is used for showing number
        // of card items in recycler view.
        return peerModelArrayList.size();
    }

    // View holder class for initializing of
    // your views such as TextView and Imageview.
    public class Viewholder extends RecyclerView.ViewHolder {
        View peerView;
        private TextView peerTextView;

        public Viewholder(@NonNull View itemView) {
            super(itemView);
            peerView = itemView;
            peerTextView = (TextView) itemView.findViewById(R.id.company_peers_value);
        }
    }
}
