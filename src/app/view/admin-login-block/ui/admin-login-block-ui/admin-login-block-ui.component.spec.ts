import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginBlockUiComponent } from './admin-login-block-ui.component';

describe('AdminLoginBlockUiComponent', () => {
  let component: AdminLoginBlockUiComponent;
  let fixture: ComponentFixture<AdminLoginBlockUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginBlockUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginBlockUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
