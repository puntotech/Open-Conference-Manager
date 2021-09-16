import { Component, OnInit } from "@angular/core";
import {
  faPaperPlane,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { filter, switchMap, tap } from "rxjs/operators";

import { ActivatedRoute } from "@angular/router";
import { CoSpeakerFormComponent } from "../co-speaker-form/co-speaker-form.component";
import { MatDialog } from "@angular/material/dialog";
import { Talk } from "../../models/talk.model";
import { TalksService } from "../../services/talks.service";
import { UserService } from "src/app/user/services/user.service";
import { WarningDialogComponent } from "../warning-dialog/warning-dialog.component";

@Component({
  selector: "app-talk-detail",
  templateUrl: "./talk-detail.component.html",
  styleUrls: ["./talk-detail.component.css"],
})
export class TalkDetailComponent implements OnInit {
  talk: Talk;
  averageGrade: number;

  faTrash = faTrash;
  faPen = faPen;
  faPaperPlane = faPaperPlane;

  constructor(
    private route: ActivatedRoute,
    private talksService: TalksService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const talkId = this.route.snapshot.paramMap.get("id");
    this.talksService
      .getTalk(talkId)
      .pipe(tap((talk) => (this.talk = talk)))
      .subscribe(console.log);
  }

  openWarningDialog() {
    const dialogRef = this.dialog.open(WarningDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.talksService.delete(this.talk.id))
      )
      .subscribe();
  }

  addSpeaker() {
    const dialogRef = this.dialog.open(CoSpeakerFormComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((speakerEmail: string) =>
          this.talksService.addCoSpeaker(this.talk.id, speakerEmail)
        )
      )
      .subscribe();
  }
}
