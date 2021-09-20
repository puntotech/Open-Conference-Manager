import { ChartModule, HIGHCHARTS_MODULES } from "angular-highcharts";

import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LayoutComponent } from "./components/layout/layout.component";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    ChartModule,
    MatMenuModule,
    FontAwesomeModule,
    MatSidenavModule,
  ],
  declarations: [ToolbarComponent, LayoutComponent],
  exports: [ToolbarComponent],
})
export class SharedModule {}
