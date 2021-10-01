import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { SpeakerInfoComponent } from "./pages/speaker-info/speaker-info.component";
import { SpeakerListComponent } from "./pages/organiser-list/speaker-list.component";

const routes: Routes = [
  {
    path: "",
    component: SpeakerListComponent,
  },
  {
    path: "speaker/:id",
    component: SpeakerInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganiserPanelRoutingModule {}
