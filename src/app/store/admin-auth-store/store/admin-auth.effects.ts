import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { login, loginSuccess, loginFailed } from './admin-auth.actions';
import { AdminAuthService } from './services/admin-auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AdminAuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap(action => this.adminAuthService.login({
          login: action.login,
          password: action.password
        }).pipe(
          map(loginSuccessData => loginSuccess(loginSuccessData)),
          catchError(
            error => of(loginFailed({
              serverError: error.message
            }))
          )
        ))
      ));

    constructor(
        private actions$: Actions,
        private adminAuthService: AdminAuthService
    ) {}
}