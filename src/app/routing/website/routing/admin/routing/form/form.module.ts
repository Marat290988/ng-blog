import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPageComponent } from './pages/form-page/form-page.component';
import {RouterModule} from "@angular/router";
import {DashboardPageComponent} from "../dashboard/pages/dashboard-page/dashboard-page.component";



@NgModule({
  declarations: [
    FormPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormPageComponent
      }
    ])
  ]
})
export class FormModule { }
