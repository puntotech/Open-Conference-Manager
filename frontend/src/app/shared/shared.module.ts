import { ChartModule } from "angular-highcharts";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HyphenatePipe } from "./pipes/hyphenate.pipe";
import { LayoutComponent } from "./components/layout/layout.component";
import { MatButtonModule } from "@angular/material/button";
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
    MatButtonModule,
  ],
  declarations: [ToolbarComponent, LayoutComponent, HyphenatePipe],
  exports: [ToolbarComponent, HyphenatePipe],
})
export class SharedModule {}
