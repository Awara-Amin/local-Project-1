import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

// export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
//  // const tokenService = inject(TokenService);
//   const router = inject(Router);

//   if (tokenService.getToken()) {
//     req = req.clone({
//       setHeaders: {
//         authorization: `Bearer ${tokenService.getToken()}`,
//       },
//     });
//   }
//   return next(req);
//   // return next(req).pipe(
//   //   retry(2),
//   //   catchError((e: HttpErrorResponse) => {
//   //     if (e.status === 401) {
//   //       tokenService.removeToken();
//   //       router.navigate(['']);
//   //     }

//   //     const error = e.error?.message || e.statusText;
//   //     return throwError(() => error);
//   //   })
//   // );
// };

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  constructor() { }
  private readonly tokenService = inject(TokenService);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log("Intercepting Requests");
        if (this.tokenService.getToken()) {
          request = request.clone({
            setHeaders: {
              authorization: `Bearer ${this.tokenService.getToken()}`,
            },
          });
        }
       // return next(req);
        return next.handle(request);
    }
}
