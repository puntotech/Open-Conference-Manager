import { SocialAuthService, SocialUser } from "angularx-social-login";

import { Component } from "@angular/core";
import { UserService } from "src/app/user/services/user.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  constructor(public userService: UserService) {}
}
