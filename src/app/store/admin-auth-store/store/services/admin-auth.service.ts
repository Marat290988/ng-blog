import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store, select } from '@ngrx/store';
import { getAuthData } from './../admin-auth.selectors';
import { AuthData } from "../admin-auth.reducer";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  isAuth$ = this.store$.pipe(
    select(getAuthData),
    filter(authData => authData !== undefined),
    map(authData => !!authData)
  )

  isGuest$ = this.isAuth$.pipe(
    map(isAuth => !isAuth)
  );

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
    private store$: Store
  ) {

  }

  login(body: {login: string, password: string}): Observable<AuthData> {
    return this.httpClient.post<{accessToken: string}>(
      'http://localhost:3000/auth/login',
      body
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      }))
    );
  }

  refresh(): Observable<AuthData> {
    return this.httpClient.post<{accessToken: string}>(
      'http://localhost:3000/auth/refresh',
      {}
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      }))
    );
  }
}
