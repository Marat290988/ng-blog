import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, timer, tap, fromEvent } from "rxjs";
import {login, loginSuccess, loginFailed, initAdminAuth, logoutSuccess, extractLoginData} from './admin-auth.actions';
import { AdminAuthService } from './services/admin-auth.service';
import { catchError, delay, delayWhen, filter, first, map, switchMap } from 'rxjs/operators';
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
          map(authData => loginSuccess({ authData })),
          catchError(
            error => of(loginFailed({
              serverError: error.message
            }))
          )
        ))
      ));

    refresh$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccess),
      switchMap(({ authData }) => timer(authData.exp * 1000 - 60 * 1000 - Date.now())),
      switchMap(() => this.store$.pipe(
        select(isAuth),
        first(),
        filter((isAdminAuth: boolean) => isAdminAuth)
      )),
      switchMap(() => this.adminAuthService.refresh()),
      map(authData => loginSuccess({ authData }))
    ));

    saveAuthDataToLocalStorage$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccess),
      tap(({ authData }) => {
        localStorage.setItem('authData', JSON.stringify(authData))
      })
    ), {dispatch: false})

    extractLoginData$ = createEffect(() => this.actions$.pipe(
      ofType(initAdminAuth, extractLoginData),
      map(() => {
        const authDataString = localStorage.getItem('authData');
        if (!authDataString) {
          return logoutSuccess();
        }

        const authData: AuthData = JSON.parse(authDataString);

        if ((authData.exp * 1000 - 10 * 1000 - Date.now()) < 0) {
          return logoutSuccess();
        }

        return loginSuccess({ authData });
      })
    ));

    listenStorageEffect$ = createEffect(() => this.actions$.pipe(
      ofType(initAdminAuth),
      switchMap(() => fromEvent(window, 'storage')),
      map(() => extractLoginData())
    ));

    constructor(
        private actions$: Actions,
        private adminAuthService: AdminAuthService,
        private store$: Store
    ) {}
}
