//Source: https://angular.io/guide/router
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSectionComponent } from './search-section/search-section.component';
import { PortfolioSectionComponent } from './portfolio-section/portfolio-section.component';
import { WatchListSectionComponent } from './watch-list-section/watch-list-section.component';
import { DetailsSectionComponent } from './details-section/details-section.component';

const routes: Routes = [
  { path: 'search/home', component: SearchSectionComponent },
  {path: '', redirectTo: '/search/home', pathMatch: 'full'},
  { path: 'portfolio', component: PortfolioSectionComponent },
  { path: 'watchlist', component: WatchListSectionComponent },
  { path: 'details/:ticker', component: DetailsSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
