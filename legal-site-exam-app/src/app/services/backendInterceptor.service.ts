import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SnackbarService } from "./snackbar.service";


export const backendErrorInterceptorService: HttpInterceptorFn =
    (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

        const snackBar = inject(SnackbarService);

        return next(request).pipe(
            catchError((event: HttpEvent<unknown>) => {
                if (event instanceof HttpErrorResponse) {
                    const commonError: string = event.message;
                    
                    snackBar.error(`Something went wrong. ${commonError}`);
                }
                return throwError(() => event);
            })
        );
    };
