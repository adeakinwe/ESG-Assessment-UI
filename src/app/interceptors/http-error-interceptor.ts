import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        /* ================================
           429 – RATE LIMIT
        ================================= */
        if (error.status === 429) {
          let message = 'Too many requests. Kindly try again later.';

          //const retryAfter = error.headers.get('Retry-After');
          // if (retryAfter) {
          //   const retryAt = new Date(retryAfter);
          //   const seconds = Math.max(
          //     Math.ceil((retryAt.getTime() - Date.now()) / 1000),
          //     1
          //   );

          //   message = `Rate limit exceeded.<br/>
          //              Try again in <strong>${seconds}s</strong>`;
          // }

          message = `<strong>${error.error}</strong>`;

          this.toastr.warning(message, '', {
            enableHtml: true,
            timeOut: 10000
          });
        }

        /* ================================
           400 / 422 – VALIDATION ERRORS
        ================================= */
        else if (error.status === 400 || error.status === 422) {
          const msg =
            error.error?.message ||
            'Invalid request. Please review your inputs.';

          this.toastr.error(msg, 'Validation Error');
        }

        /* ================================
           401 – UNAUTHORIZED
        ================================= */
        else if (error.status === 401) {
          this.toastr.info(
            'Your session has expired. Please log in again.',
            'Session Expired'
          );
          this.router.navigate(['/login']);
        }

        /* ================================
           403 – FORBIDDEN
        ================================= */
        else if (error.status === 403) {
          this.toastr.error(
            'You do not have permission to perform this action.',
            'Access Denied'
          );
        }

        /* ================================
           5xx – SERVER ERRORS
        ================================= */
        else if (error.status >= 500) {
          this.toastr.error(
            'An unexpected server error occurred. Please try again later.',
            'Server Error'
          );
        }

        /* ================================
           NETWORK / CORS / UNKNOWN
        ================================= */
        else {
          this.toastr.error(
            'A network error occurred. Please check your connection.',
            'Network Error'
          );
        }

        return throwError(() => error);
      })
    );
  }
}
