import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import {RouterModule} from "@angular/router";
import {DashboardPageComponent} from "../dashboard/pages/dashboard-page/dashboard-page.component";



@NgModule({
  declarations: [
    GridPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GridPageComponent
      }
    ])
  ]
})
export class GridModule { }
