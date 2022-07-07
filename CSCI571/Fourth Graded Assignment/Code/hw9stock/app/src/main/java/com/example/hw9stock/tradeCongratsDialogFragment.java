package com.example.hw9stock;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatButton;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class tradeCongratsDialogFragment extends androidx.fragment.app.DialogFragment{

    AppCompatButton donebtn;
    TextView congratsmsg;
    public View view;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        view = inflater.inflate(R.layout.success_trade_msg,container,false);
        setView(view);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        donebtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dismiss();
            }
        });

    }

    private void setView(View view) {
        congratsmsg  = view.findViewById(R.id.success_msg);
        donebtn = view.findViewById(R.id.done_btn);
        congratsmsg.setText("You have successfully " + tradeDialogFragment.buySellDialogString + " " + tradeDialogFragment.sharenumboughtsoldString + " shares of " + stockDetailsPage.companyName );
    }

}

