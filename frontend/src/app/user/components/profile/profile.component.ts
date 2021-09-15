import { Component, OnInit } from "@angular/core";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { User } from "../../models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;

  constructor(private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = {
        ...user,
        twitter: "https://twitter.com/nyablk",
        github: "https://github.com/NyaGarcia",
      };
      console.log(user.authToken);
    });
  }

  signOut() {
    this.authService.signOut();
  }
}
