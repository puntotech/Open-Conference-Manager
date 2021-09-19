import { Component, OnInit } from "@angular/core";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { User } from "../../../shared/models/user";
import { UserService } from "../../services/user.service";

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => (this.user = user));
  }

  signOut() {
    this.userService.logout();
  }
}
