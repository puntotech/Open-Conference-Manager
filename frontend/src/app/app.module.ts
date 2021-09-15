import { APP_INITIALIZER, NgModule } from "@angular/core";
import { GOOGLE_KEY, environment } from "src/environments/environment";
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from "angularx-social-login";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutesModule } from "./app-routes.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { UserService } from "./user/services/user.service";
import { VideogameAppInterceptor } from "./shared/services/videogame-app.interceptor";

export function initialize(userService: UserService) {
  console.log("INITIALIZING");
  /* return () => userService.loadUserData(); */
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutesModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    MatSidenavModule,
    SocialLoginModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: VideogameAppInterceptor,
      multi: true,
    },
    /* {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [UserService],
      multi: true,
    }, */
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GOOGLE_KEY),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
