import { Component, Input, OnInit } from "@angular/core";
import { filter, tap } from "rxjs/operators";

import { MatDialog } from "@angular/material/dialog";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { Talk } from "src/app/shared/models/talk.model";
import { WarningDialogComponent } from "../warning-dialog/warning-dialog.component";

@Component({
  selector: "app-talk-preview",
  templateUrl: "./talk-preview.component.html",
  styleUrls: ["./talk-preview.component.css"],
})
export class TalkPreviewComponent implements OnInit {
  @Input() talk: Talk;

  constructor(
    private speakerStore: SpeakerStore,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  submitTalk() {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        title:
          "Are you sure you want to submit this talk? You won't be able to edit or delete it once it's submitted.",
        btnMessage: "I'm sure, Submit my talk",
        warn: false,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() =>
          this.speakerStore.updateTalkEffect({
            ...this.talk,
            submitted: new Date(),
          })
        )
      )
      .subscribe();
  }
}
