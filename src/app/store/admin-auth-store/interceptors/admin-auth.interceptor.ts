import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import {getAccessToken} from "../store/admin-auth.selectors";
import {catchError, first, flatMap, mergeMap} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor(
    private store$: Store
  ) {}

  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      return this.store$.pipe(
        select(getAccessToken),
        first(),
        mergeMap(token => {
          const authRequest = token ? request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          }) : request;

          return next.handle(authRequest).pipe(
            catchError(err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  console.log('Redirect on login page OR sign out');
                  return EMPTY;
                }
              }

              throw err;
            })
          )
        })
      )
  }
}
