import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { FacebookDeleteDataComponent } from "./pages/facebook-delete-data/facebook-delete-data.component";

const routes: Routes = [
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
  },
  {
    path: "data-deletion-instructions",
    component: FacebookDeleteDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
