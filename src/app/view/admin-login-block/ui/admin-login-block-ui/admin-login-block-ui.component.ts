import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-login-block-ui',
  templateUrl: './admin-login-block-ui.component.html',
  styleUrls: ['./admin-login-block-ui.component.scss']
})
export class AdminLoginBlockUiComponent implements OnInit {

  formGroup: FormGroup;

  @Input() formError = '';
  @Output() login = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onFormChange() {
    this.formError = '';
  }

  onSubmit() {
    console.log('UI', this.formGroup.value);
    this.login.emit(this.formGroup.value);
  }

}
