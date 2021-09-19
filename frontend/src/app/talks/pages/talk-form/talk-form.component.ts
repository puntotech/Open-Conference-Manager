import { ActivatedRoute, Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter, switchMap, tap } from "rxjs/operators";

import { Observable } from "rxjs";
import { SpeakerStore } from "src/app/shared/state/speaker.store";
import { Talk } from "src/app/shared/models/talk.model";
import { TalksService } from "../../services/talks.service";
import { UserService } from "src/app/user/services/user.service";
import { routes } from "src/app/shared/consts/routes";

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
      this.talk$ = this.speakerStore.selectTalk(this.talkId).pipe(
        tap(talk => this.update(talk)));
    } else {
      this.create();
    }
  }

  private create() {
    this.action = "Create";
  }

  private update(talk) {
    this.action = "Update";
    this.talkForm.patchValue(talk);
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

  submit() {
    this.action === "Create" ? this.createTalk() : this.updateTalk();
  }

  updateTalk() {
    if (this.talkForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const talk: Talk = { ...this.talkForm.value, id: this.talkId };
      this.speakerStore.updateTalk(talk);
      this.navigateToTalkList()
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
