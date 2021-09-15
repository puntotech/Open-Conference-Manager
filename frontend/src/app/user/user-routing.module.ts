import { RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from "../shared/guards/auth-guard.service";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./components/profile/profile.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile/edit",
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
