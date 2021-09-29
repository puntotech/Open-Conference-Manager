import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { NgModule } from "@angular/core";
import { OrganiserPanelRoutingModule } from "./organiser-panel-routing.module";
import { SharedModule } from "../shared/shared.module";
import { SpeakerInfoComponent } from "./pages/speaker-info/speaker-info.component";
import { SpeakerListComponent } from "./pages/organiser-list/speaker-list.component";

@NgModule({
  declarations: [SpeakerListComponent, SpeakerInfoComponent],
  imports: [
    CommonModule,
    OrganiserPanelRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatChipsModule,
    FontAwesomeModule,
  ],
})
export class OrganiserPanelModule {}
