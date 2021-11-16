import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { NgModule } from "@angular/core";
import { OrganiserPanelComponent } from "./organiser-panel/organiser-panel.component";
import { OrganiserPanelRoutingModule } from "./organiser-panel-routing.module";
import { SharedModule } from "../shared/shared.module";
import { SpeakerInfoComponent } from "./pages/speaker-info/speaker-info.component";
import { SpeakerListComponent } from "./pages/speaker-list/speaker-list.component";
import { TalkListComponent } from "./pages/talk-list/talk-list.component";

@NgModule({
  declarations: [
    SpeakerListComponent,
    SpeakerInfoComponent,
    OrganiserPanelComponent,
    TalkListComponent,
  ],
  imports: [
    CommonModule,
    OrganiserPanelRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatChipsModule,
    FontAwesomeModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class OrganiserPanelModule {}
