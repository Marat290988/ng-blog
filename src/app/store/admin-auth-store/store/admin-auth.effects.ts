import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, timer, tap } from "rxjs";
import { login, loginSuccess, loginFailed, initAdminAuth, logoutSuccess } from './admin-auth.actions';
import { AdminAuthService } from './services/admin-auth.service';
import {catchError, delay, delayWhen, filter, first, map, switchMap} from 'rxjs/operators';
import { AuthData } from "./admin-auth.reducer";
import {select, Store} from "@ngrx/store";
import {isAuth} from "./admin-auth.selectors";

@Injectable()
export class AdminAuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap(action => this.adminAuthService.login({
          login: action.login,
          password: action.password
        }).pipe(
          map((authData: AuthData) => loginSuccess(authData)),
          catchError(
            error => of(loginFailed({
              serverError: error.message
            }))
          )
        ))
      ));

    refresh$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccess),
      delayWhen((action: AuthData) => timer(action.exp * 1000 - 60 * 1000 - Date.now())),
      switchMap(() => this.store$.pipe(
        select(isAuth),
        first(),
        filter((isAdminAuth: boolean) => isAdminAuth)
      )),
      switchMap(() => this.adminAuthService.refresh().pipe(
        map((authData: AuthData) => loginSuccess(authData))
      ))
    ));

    saveAuthDataToLocalStorage$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccess),
      tap(loginSuccessData => {
        const {type, ...authData} = loginSuccessData;
        localStorage.setItem('authData', JSON.stringify(authData))
      })
    ), {dispatch: false})

    extractLoginData$ = createEffect(() => this.actions$.pipe(
      ofType(initAdminAuth),
      map(() => {
        const authDataString = localStorage.getItem('authData');
        if (!authDataString) {
          return logoutSuccess();
        }

        const authData: AuthData = JSON.parse(authDataString);

        if ((authData.exp * 1000 - 10 * 1000 - Date.now()) < 0) {
          return logoutSuccess();
        }

        return loginSuccess(authData);
      })
    ))

    constructor(
        private actions$: Actions,
        private adminAuthService: AdminAuthService,
        private store$: Store
    ) {}
}
