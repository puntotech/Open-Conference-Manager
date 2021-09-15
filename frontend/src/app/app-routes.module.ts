import { RouterModule, Routes } from "@angular/router";

import { FaLayersCounterComponent } from "@fortawesome/angular-fontawesome";
import { LayoutComponent } from "./shared/components/layout/layout.component";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: 'talks',
        pathMatch: 'full',
      },
      {
        path: "profile",
        loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "talks",
        loadChildren: () =>
          import("./talks/talks.module").then((m) => m.TalksModule),
      },
    ],
  },

  { path: "**", redirectTo: "auth" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
