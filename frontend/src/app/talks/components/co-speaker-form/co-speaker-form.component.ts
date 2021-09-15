import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";
import { TalksService } from "../../services/talks.service";

@Component({
  selector: "app-co-speaker-form",
  templateUrl: "./co-speaker-form.component.html",
  styleUrls: ["./co-speaker-form.component.css"],
})
export class CoSpeakerFormComponent implements OnInit {
  speakerForm: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoSpeakerFormComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.speakerForm = this.fb.group({
      speaker: ["", [Validators.required, Validators.email]],
    });
  }

  get speaker() {
    return this.speakerForm.get("speaker");
  }

  searchForSpeaker() {
    if (this.speakerForm.invalid) {
      console.log(this.speakerForm.value);
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const speakerEmail: string = this.speakerForm.value;
      this.dialogRef.close(speakerEmail);
    }
  }
}
