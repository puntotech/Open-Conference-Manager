import { SocialAuthService, SocialUser } from "angularx-social-login";

import { Component } from "@angular/core";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  constructor(public authService: SocialAuthService) {}
}
