import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";

import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/user/services/user.service";

@Component({
  selector: "app-co-speaker-form",
  templateUrl: "./co-speaker-form.component.html",
  styleUrls: ["./co-speaker-form.component.css"],
})
export class CoSpeakerFormComponent implements OnInit {
  speakerForm: FormGroup;
  message: string;
  speaker$: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoSpeakerFormComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.speaker$ = this.speaker!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((email: string) => this.filter(email))
    );
  }

  createForm() {
    this.speakerForm = this.fb.group({
      speaker: ["", [Validators.required]],
    });
  }

  get speaker() {
    return this.speakerForm.get("speaker");
  }

  searchForSpeaker() {
    if (this.speakerForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const speaker = this.speakerForm.value.speaker;
      this.dialogRef.close(speaker);
    }
  }

  displayFn(speaker: User): string {
    return speaker && speaker.email ? speaker.email : "";
  }

  private filter(email: string) {
    return this.userService
      .getSpeakers()
      .pipe(
        map((speakers: User[]) =>
          speakers.filter((speaker) => speaker.email.includes(email))
        )
      );
  }
}
