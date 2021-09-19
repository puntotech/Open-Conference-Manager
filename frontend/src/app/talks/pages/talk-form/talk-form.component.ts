import { ActivatedRoute, Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter, switchMap, tap } from "rxjs/operators";

import { Talk } from "src/app/shared/models/talk.model";
import { TalksService } from "../../services/talks.service";
import { UserService } from "src/app/user/services/user.service";

@Component({
  selector: "app-talk-form",
  templateUrl: "./talk-form.component.html",
  styleUrls: ["./talk-form.component.css"],
})
export class TalkFormComponent implements OnInit {
  talk: Talk;
  message = "";
  talkForm: FormGroup;
  action: string;
  levels: string[] = ["Advanced", "Intermediate", "Beginner"];
  tracks: string[] = ["Web", "Mobile", "Cloud", "CyberSecurity"];

  constructor(
    private fb: FormBuilder,
    private talksService: TalksService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createForm();
    const talkId = this.route.snapshot.paramMap.get("id");

    if (talkId) {
      this.talksService
        .getTalk(talkId)
        .pipe(
          tap((talk) => {
            this.talk = talk;
            this.update();
          })
        )
        .subscribe();
    } else {
      this.create();
    }
  }

  private create() {
    this.action = "Create";
  }

  private update() {
    this.action = "Update";
    this.talkForm.patchValue(this.talk);
  }

  createForm() {
    this.talkForm = this.fb.group({
      title: ["", [Validators.required]],
      abstract: ["", [Validators.required]],
      level: ["", [Validators.required]],
      comments: [""],
      language: ["", [Validators.required]],
      track: ["", [Validators.required]],
    });
  }

  submit() {
    this.action === "Create" ? this.createTalk() : this.updateTalk();
  }

  updateTalk() {
    if (this.talkForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const talk: Talk = this.talkForm.value;
      this.talksService
        .update({ id: this.talk.id, ...talk })
        .pipe(tap(() => this.navigateToTalkList()))
        .subscribe();
    }
  }

  createTalk() {
    if (this.talkForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const talk: Talk = this.talkForm.value;
      this.userService.user$
        .pipe(
          filter((user) => !!user),
          switchMap((user) =>
            this.talksService.create({
              ...talk,
              createdAt: new Date(),
              //TODO: add speaker logic
              //speakers: [{ id: "1" }],
            })
          ),
          tap(() => this.navigateToTalkList())
        )
        .subscribe();
    }
  }

  private navigateToTalkList() {
    this.router.navigate(["/dashboard/talks"]);
  }

  get track() {
    return this.talkForm.get("track");
  }

  get abstract() {
    return this.talkForm.get("abstract");
  }

  get title() {
    return this.talkForm.get("title");
  }

  get comments() {
    return this.talkForm.get("comments");
  }

  get language() {
    return this.talkForm.get("language");
  }

  get level() {
    return this.talkForm.get("level");
  }
}
