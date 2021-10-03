import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";

const routes: Routes = [
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
