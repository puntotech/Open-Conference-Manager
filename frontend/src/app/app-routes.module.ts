import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

const appRoutes: Routes = [
  { path: "", redirectTo: "user/login", pathMatch: "full" },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "talks",
    loadChildren: () =>
      import("./talks/talks.module").then((m) => m.TalksModule),
  },

  { path: "**", redirectTo: "user/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
