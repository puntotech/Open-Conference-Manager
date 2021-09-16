import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { TalkDetailComponent } from "./components/talk-detail/talk-detail.component";
import { TalkFormComponent } from "./components/talk-form/talk-form.component";
import { TalkListComponent } from "./components/talk-list/talk-list.component";

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
