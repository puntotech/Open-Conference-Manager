import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  faPaperPlane,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { filter, switchMap, tap } from "rxjs/operators";

import { CoSpeakerFormComponent } from "../../components/co-speaker-form/co-speaker-form.component";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { Talk } from "../../../shared/models/talk.model";
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
  ) {}

  ngOnInit() {
    this.talkId = +this.route.snapshot.paramMap.get("id");
    this.talk$ = this.speakerStore.selectTalk(this.talkId);
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

  addSpeaker() {
    const dialogRef = this.dialog.open(CoSpeakerFormComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((speakerEmail: string) => this.speakerStore.addCoSpeaker({ talkId: this.talkId, speakerEmail})),
        tap(() => this.navigateToTalkList())
      )
      .subscribe();
  }

  submitTalk(talk) {
    this.speakerStore.updateTalk({
      ...talk,
      submitted: new Date(),
    });
    this.navigateToTalkList();
  }

  private navigateToTalkList() {
    this.router.navigate([routes.TALKS]);
  }
}
