import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from "angularx-social-login";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { APP_INITIALIZER } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutesModule } from "./app-routes.module";
import { AuthInterceptor } from "./shared/services/auth.interceptor";
import { AuthService } from "./auth/services/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GOOGLE_KEY } from "src/environments/environment";
import { MatButtonModule } from "@angular/material/button";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { UserService } from "./user/services/user.service";

export function initialize(authService: AuthService) {
  console.log("INITIALIZING");
  return () => authService.loadUserData();
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
    SocialLoginModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [AuthService],
      multi: true,
    },
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
