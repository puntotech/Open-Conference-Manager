import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";

import { AppSettings } from "src/app/app.settings";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { UserService } from "src/app/user/services/user.service";
import { routes } from "src/app/shared/consts/routes";
import { tap } from "rxjs/operators";

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
     private readonly userService: UserService,
    private readonly authService: SocialAuthService,
    private readonly speakerStore: SpeakerStore,
    private readonly router: Router,
  ) {
    this.ifIsLoggedRedirectToDashboard();
  }


  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userSocial) =>
        this.userService
          .login({
            accessToken: userSocial.authToken,
            endpoint: "http://localhost:3000/auth/google-login",
          })
/*           .pipe(
            tap(speaker => this.speakerStore.loadSpeaker(speaker),
              tap(() => this.router.navigate([routes.DASHBOARD]))),
           )*/.subscribe(
             speaker => {
               this.speakerStore.loadSpeaker(speaker);
               this.router.navigate([routes.DASHBOARD]);
             })
      );
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.userService.logout();
  }
  ifIsLoggedRedirectToDashboard() {
    if (localStorage.getItem(AppSettings.APP_LOCALSTORAGE_TOKEN)) {
      this.router.navigate([routes.DASHBOARD]);
    }
  }

}
