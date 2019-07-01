import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { AppState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { selectAuthenticationToken } from '../auth/store/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private store: Store<AppState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.pipe(
            select(selectAuthenticationToken),
            take(1),
            exhaustMap((storedToken: string) => {
                let req = request;

                if (storedToken) {
                    req = request.clone({
                        headers: request.headers
                        .append('Content-type', 'application/json')
                        .append('Authorization', `Bearer ${storedToken}`)
                    });
                }

                return next.handle(req)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = '';
                        if (error.error instanceof ErrorEvent) {
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            errorMessage = `Error Code: ${error.status}. Message: ${error.error.message}`;
                        }
                        if (errorMessage) {
                            alert(errorMessage);
                        }
                        return throwError(errorMessage);
                    })
                );
            })
        );
    }
}
