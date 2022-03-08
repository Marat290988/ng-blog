import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';

import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    HomePagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: HomePagesComponent}
    ]),
    MatSliderModule
  ]
})
export class HomeModule { }
