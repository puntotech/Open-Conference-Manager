import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/user/services/user.service";
import { routes } from "src/app/consts/routes";

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
    private fb: FormBuilder,
    private userService: UserService,
    private authService: SocialAuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userSocial) => this.userService.login({
        accessToken: userSocial.authToken,
        endpoint: 'http://localhost:3000/auth/google-login',
      }).subscribe()
    );
  }

  

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  /*  createForm() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.message = "Please correct all errors";
    } else {
      const login = this.loginForm.value;
      this.userService.login(login).subscribe(
        (res) => {
          console.log("Successfully logged in");
          this.message = res.msg;
        },
        (err) => {
          console.error("Error logging in", err);
          this.message = err.error;
        }
      );
    }
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  } */
}
