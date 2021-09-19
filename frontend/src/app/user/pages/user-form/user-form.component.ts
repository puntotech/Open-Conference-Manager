import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { User } from "../../../shared/models/user";
import { UserService } from "../../services/user.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  message: string;
  speaker: User;
  speaker$ = this.speakerStore.speaker$;

  private urlRegex =
    "/^(http[s]?://){0,1}(www.){0,1}[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}[.]{0,1}/";

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly speakerStore: SpeakerStore,
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.speaker$
      .pipe(
        tap((user) => {
          this.userForm.patchValue(user);
        })
      )
      .subscribe();
  }

  createForm() {
    this.userForm = this.fb.group({
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
      const user: User = this.userForm.value;
      this.userService.update(this.speaker.id, user);
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
