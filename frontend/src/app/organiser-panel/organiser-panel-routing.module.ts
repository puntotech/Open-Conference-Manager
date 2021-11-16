import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { OrganiserPanelComponent } from "./organiser-panel/organiser-panel.component";
import { SpeakerInfoComponent } from "./pages/speaker-info/speaker-info.component";

const routes: Routes = [
  {
    path: "",
    component: OrganiserPanelComponent,
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
