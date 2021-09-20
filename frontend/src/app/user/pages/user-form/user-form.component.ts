import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { User } from "../../../shared/models/user";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  message: string;
  speaker$ = this.speakerStore.speaker$;

  private urlRegex: RegExp = /^(http[s]?:\/\/)(www.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/;

  constructor(
    private readonly fb: FormBuilder,
    private readonly speakerStore: SpeakerStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.speaker$
      .pipe(
        tap((speaker) => {
          this.userForm.patchValue(speaker);
        })
      )
      .subscribe();
  }

  createForm() {
    this.userForm = this.fb.group({
      id: -1,
      name: ["", [Validators.required]],
      bio: [""],
      city: [""],
      company: [""],
      twitter: ["", [Validators.pattern(this.urlRegex)]],
      github: ["", [Validators.pattern(this.urlRegex)]],
      youtube: ["", [Validators.pattern(this.urlRegex)]],
      linkedin: ["", [Validators.pattern(this.urlRegex)]],
      tagline: [""],
    });
  }

  updateUser() {
    if (this.userForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const speaker: User = this.userForm.value;
      this.speakerStore.updateSpeakerEffect(speaker);
      this.router.navigate(["dashboard/profile"]);
    }
  }

  get name() {
    return this.userForm.get("name");
  }

  get bio() {
    return this.userForm.get("bio");
  }

  get city() {
    return this.userForm.get("city");
  }

  get company() {
    return this.userForm.get("company");
  }

  get twitter() {
    return this.userForm.get("twitter");
  }

  get github() {
    return this.userForm.get("github");
  }

  get youtube() {
    return this.userForm.get("youtube");
  }

  get linkedin() {
    return this.userForm.get("linkedin");
  }

  get tagline() {
    return this.userForm.get("tagline");
  }
}
