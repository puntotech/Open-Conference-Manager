import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute } from "@angular/router";
import { Talk } from "../../models/talk.model";
import { TalksService } from "../../services/talks.service";
import { tap } from "rxjs/operators";

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

  constructor(
    private fb: FormBuilder,
    private talksService: TalksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    const talkId = this.route.snapshot.paramMap.get("id");
    console.log(talkId);

    this.talksService
      .getTalk(talkId)
      .pipe(
        tap((talk) => {
          this.talk = talk;
          console.log("miau");
          talk ? this.update() : this.create();
        })
      )
      .subscribe();
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
      comments: ["", [Validators.required]],
      language: ["", [Validators.required]],
    });
  }

  createTalk() {
    if (this.talkForm.invalid) {
      console.log(this.talkForm.value);
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const talk: Talk = this.talkForm.value;
      this.talksService.create({ ...talk, createdAt: new Date() });
    }
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
