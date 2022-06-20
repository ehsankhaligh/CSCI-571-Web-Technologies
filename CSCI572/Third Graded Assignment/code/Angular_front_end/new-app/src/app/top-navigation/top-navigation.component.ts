import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  constructor(private searchRout: Router) { }

  active_page;
  styletop;
  searchFlag: boolean = false;
  watchlistFlag: boolean = false;
  profileFlag: boolean = false;
  isCollapsed = true;


  ngOnInit() {
    console.log("this.searchRout.url:",  window.location.href);
    let pageURL = window.location.href;

    if(pageURL.includes("search")){
      this.styletop = "border: 0.5px solid white;"
      this.searchFlag = true;
    }

    if(pageURL.includes("profile")){
      this.styletop = "border: 0.5px solid white;"
      this.profileFlag = true;
    }

    if(pageURL.includes("watchlist")){
      this.styletop = "border: 0.5px solid white;"
      this.watchlistFlag = true;
    }

  }
  togglePanel(collapseButton: HTMLElement, collapsePanel: HTMLElement) {
    if (this.isCollapsed) {
      collapseButton.classList.add('collapsed');
      collapsePanel.classList.remove('show');
    } else {
      collapsePanel.classList.add('show');
      collapseButton.classList.remove('collapsed');
    }
    this.isCollapsed = !this.isCollapsed
  }

}
