import { faCog, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";

import { Component, HostListener, ViewChild } from "@angular/core";
import { Role } from "../../models/role.model";
import { SpeakerStore } from "../../state/speaker.store";
import { User } from "../../models/user";
import { MatSidenav } from "@angular/material/sidenav";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent {
  speaker$ = this.speakerStore.speaker$;
  faUser = faUser;
  faPaperPlane = faPaperPlane;
  faCog = faCog;

  maxMobileDisplayWidth = 1000;
  isMobileDisplay: boolean;
  mode: string;
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  constructor(
    private readonly speakerStore: SpeakerStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.onResize(window.innerWidth);

    this.router.events
      .pipe(filter((val) => val instanceof NavigationEnd))
      .subscribe((_) => this.updateSidenav());
  }

  isAdmin(user: User) {
    return user.role === Role.ADMIN;
  }

  @HostListener("window:resize", ["$event.target.innerWidth"])
  onResize(width: number) {
    this.isMobileDisplay = this.isMobileDisplayWidth(width);
    this.updateMode();
    this.updateSidenav();
  }

  private updateSidenav() {
    this.sidenav.toggle(!this.isMobileDisplay);
  }

  private updateMode() {
    this.mode = this.isMobileDisplay ? "over" : "side";
  }

  private isMobileDisplayWidth(width: number) {
    return width < this.maxMobileDisplayWidth;
  }
}
