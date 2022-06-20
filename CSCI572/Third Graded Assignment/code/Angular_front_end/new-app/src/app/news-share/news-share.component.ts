/*
  Source:
  https://ng-bootstrap.github.io/#/components/modal/examples
*/

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

import { companyNewsData } from '../interfaces';


@Component({
  selector: 'app-news-share',
  templateUrl: './news-share.component.html',
  styleUrls: ['./news-share.component.css']
})

export class NewsShareComponent implements OnInit {

  @Input() public DataNewsObj: companyNewsData;
  facebookShareLink;

  constructor(public newsModalService: NgbActiveModal) {}

 ngOnInit() {
   //<a href="https://www.facebook.com/sharer/sharer.php?u=blog.shahednasser.com&quote=Awesome%20Blog!">Share on Facebook</a>
   //https://fontawesomeicons.com/bootstrap/icons/facebook
    this.facebookShareLink = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.DataNewsObj.url) + "&quote=" + encodeURIComponent(this.DataNewsObj.headline);
  }

}
