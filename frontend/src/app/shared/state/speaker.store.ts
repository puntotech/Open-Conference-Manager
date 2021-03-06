import { CoSpeakerDto, User } from "../models/user";
import { ComponentStore, tapResponse } from "@ngrx/component-store";

import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Talk } from "../models/talk.model";
import { TalksService } from "src/app/talks/services/talks.service";
import { UserService } from "src/app/user/services/user.service";
import { switchMap } from "rxjs/operators";

export interface SpeakerState {
  speaker: User;
}

const defaultState: SpeakerState = {
  speaker: {} as User,
};

@Injectable({
  providedIn: "root",
})
export class SpeakerStore extends ComponentStore<SpeakerState> {
  constructor(
    private talkService: TalksService,
    private userService: UserService
  ) {
    super(defaultState);
  }

  readonly speaker$ = this.select(({ speaker }) => speaker);

  readonly loadSpeaker = this.updater((state, speaker: User | null) => ({
    ...state,
    speaker: speaker || null,
  }));

  selectTalk(talkId: number) {
    return this.select((state) => state.speaker?.talks[talkId]);
  }

  readonly updateSpeaker = this.updater((state, speaker: User) => ({
    speaker: {
      ...state.speaker,
      ...speaker,
      talks: { ...state.speaker.talks },
    },
  }));

  readonly addTalk = this.updater((state, talk: Talk) => ({
    speaker: {
      ...state.speaker,
      talks: {
        ...state.speaker.talks,
        [talk.id]: talk,
      },
    },
  }));

  readonly updateTalk = this.updater((state, talk: Talk) => {
    const talks = { ...state.speaker.talks };
    talks[talk.id] = talk;
    return {
      speaker: {
        ...state.speaker,
        talks: {
          ...talks,
        },
      },
    };
  });

  readonly removeTalk = this.updater((state, talk: Talk) => {
    const talks = { ...state.speaker.talks };
    delete talks[talk.id];
    return {
      speaker: {
        ...state.speaker,
        talks,
      },
    };
  });

  readonly createTalk = this.effect((talk$: Observable<Talk>) => {
    return talk$.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((talk) =>
        this.talkService.create({ ...talk, createdAt: new Date() }).pipe(
          //???? Act on the result within inner pipe.
          tapResponse(
            (talk) => this.addTalk(talk),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly updateTalkEffect = this.effect((talk$: Observable<Talk>) => {
    return talk$.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((talk) =>
        this.talkService
          .update({
            ...talk,
            id: talk.id,
          })
          .pipe(
            //???? Act on the result within inner pipe.
            tapResponse(
              (talk) => this.updateTalk(talk),
              (error: HttpErrorResponse) => console.log(error)
            )
          )
      )
    );
  });

  readonly updateSpeakerEffect = this.effect((speaker$: Observable<User>) => {
    return speaker$.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((speaker) =>
        this.userService.updateMe(speaker).pipe(
          //???? Act on the result within inner pipe.
          tapResponse(
            (speaker) => this.updateSpeaker(speaker),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly deleteTalk = this.effect((talkId$: Observable<number>) => {
    return talkId$.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((id) =>
        this.talkService.delete(id).pipe(
          //???? Act on the result within inner pipe.
          tapResponse(
            (talk) => this.removeTalk(talk),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly submitTalkEffect = this.effect((talkId$: Observable<number>) => {
    return talkId$.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((id) =>
        this.talkService.submit(id).pipe(
          //???? Act on the result within inner pipe.
          tapResponse(
            (talk) => this.updateTalk(talk),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly addCoSpeaker = this.effect((talk$: Observable<CoSpeakerDto>) => {
    return talk$.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((talk: CoSpeakerDto) =>
        this.talkService.addCospeaker(talk).pipe(
          //???? Act on the result within inner pipe.
          tapResponse(
            (talk) => talk,
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly removeCoSpeaker = this.effect((talk$: Observable<CoSpeakerDto>) => {
    return talk$.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((talk: CoSpeakerDto) =>
        this.talkService.removeCospeaker(talk).pipe(
          //???? Act on the result within inner pipe.
          tapResponse(
            (talk) => talk,
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly getTalk = this.effect((talkId: Observable<number>) => {
    return talkId.pipe(
      // ???? Handle race condition with the proper choice of the flattening operator.
      switchMap((id) =>
        this.talkService.getTalk(id).pipe(
          //???? Act on the result within inner pipe.
          tapResponse(
            (talk) => this.addTalk(talk),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });
}
