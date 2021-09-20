import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
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
            accessToken: userSocial.authToken,
            endpoint: "http://localhost:3000/auth/google-login",
          })
          .pipe
          /* tap((speaker) => this.speakerStore.loadSpeaker(speaker)),
            tap(() => this.router.navigate([routes.DASHBOARD])) */
          ()
          .subscribe()
      );
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
