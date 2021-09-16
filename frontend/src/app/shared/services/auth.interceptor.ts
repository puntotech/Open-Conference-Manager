import { HttpEvent, HttpInterceptor } from "@angular/common/http";
import { HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";

import { AppSettings } from "src/app/app.settings";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/user/services/user.service";
import { UserStoreService } from "./user-store.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userStore: UserStoreService,
    private userService: UserService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(AppSettings.APP_LOCALSTORAGE_TOKEN);
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          authorization:`Bearer ${token}`,
       }
      });
      req = authReq;
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 && err.error === "jwt expired") {
          this.userService.logout();
          location.reload();
        }

        return throwError(err);
      })
    );
  }
}
