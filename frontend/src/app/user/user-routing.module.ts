import { RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from "../shared/guards/auth-guard.service";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./components/profile/profile.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "edit",
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
