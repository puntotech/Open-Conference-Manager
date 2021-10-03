import { Component, Input, OnInit } from "@angular/core";
import {
  faBars,
  faHamburger,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { SpeakerStore } from "../../state/speaker.store";
import { routes } from "src/app/shared/consts/routes";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  faUser = faUser;
  faSignOut = faSignOutAlt;
  speaker$ = this.speakerStore.speaker$;
  faMenu = faBars;

  constructor(
    public authService: AuthService,
    private router: Router,
    private readonly speakerStore: SpeakerStore
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate([routes.LOGIN]);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
