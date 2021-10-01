import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  filter,
  map,
  mergeAll,
  mergeMap,
  share,
  switchMap,
  tap,
  toArray,
} from "rxjs/operators";

import { ActivatedRoute } from "@angular/router";
import { Talk } from "src/app/shared/models/talk.model";
import { TalksService } from "src/app/talks/services/talks.service";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/user/services/user.service";

@Component({
  selector: "app-speaker-info",
  templateUrl: "./speaker-info.component.html",
  styleUrls: ["./speaker-info.component.css"],
})
export class SpeakerInfoComponent implements OnInit {
  speaker: User;
  panelOpenState = false;
  talks: Talk[];
  subscription: Subscription;

  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private talkService: TalksService
  ) {}

  ngOnInit(): void {
    const speakerId = this.route.snapshot.paramMap.get("id");

    // TODO: Refactor
    this.subscription = this.userService
      .getSpeakerById(+speakerId)
      .pipe(
        tap((speaker: User) => (this.speaker = speaker)),
        map(({ talks }) => Object.values(talks)),
        mergeAll(),
        filter((talk: Talk) => !!talk.submitted),
        mergeMap(({ id }) => this.talkService.getTalk(id)),
        toArray(),
        tap((talks) => (this.talks = talks))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
