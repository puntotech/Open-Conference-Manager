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
import more from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

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
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, solidGauge] },
  ],
})
export class SharedModule {}
