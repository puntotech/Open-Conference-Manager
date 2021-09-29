import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Talk, TalkWithStatus } from "../../../shared/models/talk.model";
import {
  faPaperPlane,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { filter, tap } from "rxjs/operators";

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
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        title:
          "You are about to delete your talk. This action is irreversible.",
        subtitle: "Are you sure you want to delete?",
        btnMessage: "I'm sure, Delete this talk",
        warn: true,
      },
    });

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
            talkId: talk.id,
            speakerId: +speaker.id,
          })
        ),
        tap((speaker: User) => this.addCoSpeaker(talk, speaker))
      )
      .subscribe();
  }

  removeSpeaker(talk: TalkWithStatus, speaker: User) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        title: "Are you sure you want to delete this co-speaker?",
        btnMessage: "I'm sure, Delete this co-speaker",
        warn: true,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() =>
          this.speakerStore.removeCoSpeaker({
            talkId: talk.id,
            speakerId: +speaker.id,
          })
        ),
        tap(() => this.removeCoSpeaker(talk, speaker))
      )
      .subscribe();
  }

  submitTalk(talk: Talk) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        title: "Are you sure you want to submit this talk?",
        subtitle: "You won't be able to edit or delete it once it's submitted.",
        btnMessage: "I'm sure, Submit my talk",
        warn: false,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.speakerStore.submitTalkEffect(talk.id)),
        tap(() => this.navigateToTalkList())
      )
      .subscribe();
  }

  private navigateToTalkList() {
    this.router.navigate([routes.TALKS]);
  }

  private addCoSpeaker(talk: TalkWithStatus, speaker: User) {
    talk.speakerTalkStatus = [
      ...talk.speakerTalkStatus,
      {
        speaker,
        speakerId: +speaker.id,
        talkId: talk.id,
        createdAt: new Date(),
        admin: false,
      },
    ];
  }

  private removeCoSpeaker(talk: TalkWithStatus, speaker: User) {
    talk.speakerTalkStatus = talk.speakerTalkStatus.filter(
      ({ speakerId }) => speakerId !== +speaker.id
    );
  }
}
