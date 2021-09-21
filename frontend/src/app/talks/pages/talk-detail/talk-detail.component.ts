import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Talk, TalkWithStatus } from "../../../shared/models/talk.model";
import {
  faPaperPlane,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { filter, map, switchMap, tap } from "rxjs/operators";

import { CoSpeakerFormComponent } from "../../components/co-speaker-form/co-speaker-form.component";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { TalksService } from "../../services/talks.service";
import { User } from "src/app/shared/models/user";
import { WarningDialogComponent } from "../../components/warning-dialog/warning-dialog.component";
import { routes } from "src/app/shared/consts/routes";

@Component({
  selector: "app-talk-detail",
  templateUrl: "./talk-detail.component.html",
  styleUrls: ["./talk-detail.component.css"],
})
export class TalkDetailComponent implements OnInit {
  talk$: Observable<Talk>;
  talkId: number;

  faTrash = faTrash;
  faPen = faPen;
  faPaperPlane = faPaperPlane;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly speakerStore: SpeakerStore,
    private readonly talkService: TalksService
  ) {}

  ngOnInit() {
    this.talkId = +this.route.snapshot.paramMap.get("id");
    this.talk$ = this.talkService.getTalk(this.talkId);
  }

  openWarningDialog() {
    const dialogRef = this.dialog.open(WarningDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.speakerStore.deleteTalk(this.talkId)),
        tap(() => this.navigateToTalkList())
      )
      .subscribe();
  }

  addSpeaker(talk: TalkWithStatus) {
    const dialogRef = this.dialog.open(CoSpeakerFormComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((speaker: User) =>
          this.speakerStore.addCoSpeaker({
            ...talk,
            speakerId: +speaker.id,
          })
        ),
        tap(() => this.navigateToTalkList())
      )
      .subscribe();
  }

  submitTalk(talk: Talk) {
    console.log(talk);
    this.speakerStore.updateTalk({
      ...talk,
      submitted: new Date(),
    });
  }

  private navigateToTalkList() {
    this.router.navigate([routes.TALKS]);
  }
}
