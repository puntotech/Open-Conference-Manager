import { ComponentStore, tapResponse } from '@ngrx/component-store';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Talk } from '../models/talk.model';
import { TalksService } from 'src/app/talks/services/talks.service';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';

export interface SpeakerState {
  speaker: User;
}

const defaultState: SpeakerState = {
    speaker: {} as User,
};

@Injectable({
    providedIn: 'root'
})
export class SpeakerStore extends ComponentStore<SpeakerState> {
  constructor(private talkService: TalksService) {
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
    
    readonly addTalk = this.updater((state, talk: Talk) => ({
    speaker: {
        ...state.speaker,
        talks: {
            ...state.speaker.talks,
            [talk.id]: talk,
        }
      }
    }));
  
  readonly removeTalk = this.updater((state, talk: Talk) => {
    const talks = { ...state.speaker.talks };
    delete talks[talk.id];
    return {
      speaker: {
        ...state.speaker,
        talks,
      }
    };
  });
    
  readonly createTalk = this.effect((talk$: Observable<Talk>) => {
    return talk$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
        switchMap((talk) => this.talkService.create({ ...talk, createdAt: new Date() })
            .pipe(
        //👇 Act on the result within inner pipe.
        tapResponse(
          (talk) => this.addTalk(talk),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });
    
  readonly updateTalk = this.effect((talk$: Observable<Talk>) => {
    return talk$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
        switchMap((talk) => this.talkService.update({
            ...talk,
            id: talk.id,
        })
            .pipe(
        //👇 Act on the result within inner pipe.
        tapResponse(
          (talk) => this.addTalk(talk),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });
    
  readonly deleteTalk = this.effect((talkId$: Observable<number>) => {
    return talkId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
        switchMap(id => this.talkService.delete(id)
            .pipe(
        //👇 Act on the result within inner pipe.
        tapResponse(
          (talk) => this.removeTalk(talk),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });


  readonly addCoSpeaker = this.effect((coSpeaker$: Observable<{ talkId: number, speakerEmail: string}>) => {
    return coSpeaker$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
        switchMap(coSpeaker => this.talkService.addCoSpeaker(coSpeaker.talkId, coSpeaker.speakerEmail)
            .pipe(
        //👇 Act on the result within inner pipe.
        tapResponse(
          (talk) => console.log('todo'),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });
    
  readonly getTalk = this.effect((talkId: Observable<number>) => {
    return talkId.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((id) => this.talkService.getTalk(id).pipe(
        //👇 Act on the result within inner pipe.
        tapResponse(
          (talk) => this.addTalk(talk),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });
}