import { Component } from "@angular/core";
import { SpeakerStore } from "../../state/speaker.store";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  speaker$ = this.speakerStore.speaker$;
  constructor(private readonly speakerStore: SpeakerStore) {}
}
