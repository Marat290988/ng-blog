import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminLoginBlockUiComponent } from './ui/admin-login-block-ui/admin-login-block-ui.component';
import { AdminLoginBlockComponent } from './blocks/admin-login-block/admin-login-block.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminLoginBlockUiComponent,
    AdminLoginBlockComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminLoginBlockComponent
  ]
})
export class AdminLoginBlockModule { }
