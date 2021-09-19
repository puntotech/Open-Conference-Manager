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
import { Talk } from "../../../shared/models/talk.model";
import { TalksService } from "../../services/talks.service";
import { WarningDialogComponent } from "../../components/warning-dialog/warning-dialog.component";

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
    private router: Router,
    private talksService: TalksService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const talkId = +this.route.snapshot.paramMap.get("id");
    this.talksService
      .getTalk(talkId)
      .pipe(tap((talk) => (this.talk = talk)))
      .subscribe();
  }

  openWarningDialog() {
    const dialogRef = this.dialog.open(WarningDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.talksService.delete(this.talk.id)),
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
        switchMap((speakerEmail: string) =>
          this.talksService.addCoSpeaker(this.talk.id, speakerEmail)
        ),
        tap(() => this.navigateToTalkList())
      )
      .subscribe();
  }

  private navigateToTalkList() {
    this.router.navigate(["/dashboard/talks"]);
  }
}
