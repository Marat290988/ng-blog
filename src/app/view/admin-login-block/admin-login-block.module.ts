import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginBlockUiComponent } from './ui/admin-login-block-ui/admin-login-block-ui.component';
import { AdminLoginBlockComponent } from './blocks/admin-login-block/admin-login-block.component';



@NgModule({
  declarations: [
    AdminLoginBlockUiComponent,
    AdminLoginBlockComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminLoginBlockComponent
  ]
})
export class AdminLoginBlockModule { }
