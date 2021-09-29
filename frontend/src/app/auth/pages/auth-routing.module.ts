import { RouterModule, Routes } from "@angular/router";

import { LoadingComponent } from "src/app/auth/pages/loading/loading.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "loading", component: LoadingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
