import { ActivatedRoute, Router } from "@angular/router";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
import { filter, switchMap, tap } from "rxjs/operators";

import { AppSettings } from "src/app/app.settings";
import { AuthService } from "../../services/auth.service";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { routes } from "src/app/shared/consts/routes";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public message = "";
  public loginForm: FormGroup;
  public user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(
    private readonly authService: AuthService,
    private readonly socialAuthService: SocialAuthService,
    private readonly router: Router
  ) {
    this.ifIsLoggedRedirectToDashboard();
  }

  ngOnInit() {}

  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userSocial) =>
        this.authService
          .login({
            data: { access_token: userSocial.authToken },
            endpoint: `${environment.APIENDPOINT_BACKEND}/auth/google-login`,
          })
          .subscribe()
      );
  }

  signInWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userSocial) =>
        this.authService
          .login({
            data: { access_token: userSocial.authToken },
            endpoint: `${environment.APIENDPOINT_BACKEND}/auth/facebook-login`,
          })
          .subscribe()
      );
  }
  signInWithTwitter(): void {
    this.authService
      .requestTwitterRedirectUri()
      .pipe(
        tap((response: { redirect_uri: string }) => {
          window.location.replace(response.redirect_uri);
        })
      )
      .subscribe();
  }

  refreshGoogleToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.logout();
  }

  ifIsLoggedRedirectToDashboard() {
    if (localStorage.getItem(AppSettings.APP_LOCALSTORAGE_TOKEN)) {
      this.router.navigate([routes.DASHBOARD]);
    }
  }
}
