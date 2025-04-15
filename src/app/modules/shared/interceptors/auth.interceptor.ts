import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
        private globalService: GlobalService
    ) { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let apiUrl = request.url;
        if (apiUrl.includes('/no-auth/')) {
            apiUrl = apiUrl.replace('/no-auth/', '/');
            return next.handle(request.clone({ url: apiUrl }));
        } else {
            const token = JSON.parse(localStorage.getItem('token'));
            if (token) {
                request = request.clone({
                    url: apiUrl,
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }

        return next.handle(request).pipe(
            tap({
                next: event => {
                    return event;
                },
                error: error => {
                    if (error.status === 401) {
                        this.globalService.setObservable('isLoading', false);
                        this.globalService.clearStorage();
                        this.globalService.goToPage('/auth/signin');
                    } else if (error.status === 404) {
                        // console.log('Page Not Found!');
                    }
                },
            })
        );
    }
}