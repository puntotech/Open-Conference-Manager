import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { filter, switchMap, tap } from "rxjs/operators";

import { AppSettings } from "src/app/app.settings";
import { AuthService } from "../../services/auth.service";
import { routes } from "src/app/shared/consts/routes";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ifIsLoggedRedirectToDashboard();

    this.route.queryParams
      .pipe(
        switchMap(({ oauth_token, oauth_verifier }) => {
          if (!oauth_token || !oauth_verifier) {
            return this.router.navigate([routes.LOGIN]);
          }

          return this.authService.login({
            data: { oauth_token, oauth_verifier },
            endpoint: "http://localhost:3000/auth/twitter/signin",
          });
        })
      )
      .subscribe();
  }

  private ifIsLoggedRedirectToDashboard() {
    if (localStorage.getItem(AppSettings.APP_LOCALSTORAGE_TOKEN)) {
      this.router.navigate([routes.DASHBOARD]);
    }
  }
}
