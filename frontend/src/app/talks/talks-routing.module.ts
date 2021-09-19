import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { TalkDetailComponent } from "./pages/talk-detail/talk-detail.component";
import { TalkFormComponent } from "./pages/talk-form/talk-form.component";
import { TalkListComponent } from "./pages/talk-list/talk-list.component";

const routes: Routes = [
  {
    path: "",
    component: TalkListComponent,
  },
  { path: "create", component: TalkFormComponent },

  { path: "update/:id", component: TalkFormComponent },
  {
    path: ":id",
    component: TalkDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalksRoutingModule {}
