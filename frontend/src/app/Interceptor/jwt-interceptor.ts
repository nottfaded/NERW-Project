import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AccountData } from '../injectable-services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private router: Router, private account: AccountData) {}
    
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('accessToken');
        
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        
        return next.handle(req).pipe(
            catchError((error) => {
              if (error.status === 401) {
                alert("Ваш сеанс було завершено, увійдіть ще раз");
                this.account.logOut();
                this.router.navigate(['/auth'], { queryParams: { type: "authorization" } });
              } else if (error.status === 403) {
                alert('У вас немає доступу');
              }
              throw error;
            })
        );
    }
}