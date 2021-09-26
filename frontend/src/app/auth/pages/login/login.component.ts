import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
  FacebookLoginProvider,
} from "angularx-social-login";

import { AppSettings } from "src/app/app.settings";
import { AuthService } from "../../services/auth.service";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
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

  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userSocial) =>
        this.authService
          .login({
            access_token: userSocial.authToken,
            endpoint: "http://localhost:3000/auth/google-login",
          })
          .pipe()
          .subscribe()
      );
  }

  signInWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userSocial) =>
        this.authService
          .login({
            access_token: userSocial.authToken,
            endpoint: "http://localhost:3000/auth/facebook-login",
          })
          .pipe()
          .subscribe()
      );
  }
  signInWithTwitter(): void {
    this.authService
      .requestTwitterRedirectUri()
      .subscribe((response: { redirect_uri: string }) => {
        window.open(
          response.redirect_uri,
          "DescriptiveWindowName",
          "width=600,height=700,resizable,scrollbars=yes,status=1"
        );
      }); /* then((userSocial) =>
      this.authService
        .login({
          oauth_token: userSocial.oauth_token,
          oauth_verifier: userSocial.oauth_verifier,
          endpoint: "http://localhost:3000/auth/twitter-sigint",
        })
        .pipe()
        .subscribe() 
    );*/
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
