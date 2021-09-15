import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Talk } from "../models/talk";
import { TalksService } from "./talks.service";

@Injectable({
  providedIn: "root",
})
export class TalksLoadResolverService implements Resolve<Talk> {
  constructor(private talksService: TalksService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Talk | Observable<Talk> | Promise<Talk> {
    const talkId = route.paramMap.get("id");
    return this.talksService.getTalk(talkId);
  }
}
