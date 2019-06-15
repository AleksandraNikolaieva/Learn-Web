import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        let req = request;

        if (token) {
            req = request.clone({
                headers: request.headers
                .append('Content-type', 'application/json')
                .append('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        errorMessage = `Error Code: ${error.status}. Message: ${error.message}\n ${error.error.message}`;
                    }
                    if (errorMessage) {
                        alert(errorMessage);
                    }
                    return throwError(errorMessage);
                })
            );
    }
}
