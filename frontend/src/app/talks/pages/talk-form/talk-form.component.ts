import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { Talk } from "src/app/shared/models/talk.model";
import { routes } from "src/app/shared/consts/routes";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-talk-form",
  templateUrl: "./talk-form.component.html",
  styleUrls: ["./talk-form.component.css"],
})
export class TalkFormComponent implements OnInit {
  speaker$ = this.speakerStore.speaker$;
  talk$: Observable<Talk>;
  talkId: number;
  message = "";
  talkForm: FormGroup;
  action: string;
  levels: string[] = ["Advanced", "Intermediate", "Beginner"];
  tracks: string[] = ["Web", "Mobile", "Cloud", "CyberSecurity"];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private speakerStore: SpeakerStore
  ) {}

  ngOnInit() {
    this.createForm();
    this.talkId = +this.route.snapshot.paramMap.get("id");

    if (this.talkId) {
      this.speakerStore.getTalk(this.talkId);
      this.talk$ = this.speakerStore
        .selectTalk(this.talkId)
        .pipe(tap((talk) => this.update(talk)));
    } else {
      this.create();
    }
  }

  private create() {
    this.action = "Create";
  }

  private update(talk: Talk) {
    this.action = "Update";
    this.talkForm.patchValue(talk);
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
      const talk: Talk = { ...this.talkForm.value, id: this.talkId };
      this.speakerStore.updateTalk(talk);
      this.router.navigate([`dashboard/talks/${this.talkId}`]);
    }
  }

  createTalk() {
    if (this.talkForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const talk: Talk = this.talkForm.value;
      this.speakerStore.createTalk(talk);
      this.navigateToTalkList();
    }
  }

  deleteTalk() {
    this.speakerStore.deleteTalk(this.talkId);
    this.navigateToTalkList();
  }

  private navigateToTalkList() {
    this.router.navigate([routes.TALKS]);
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
