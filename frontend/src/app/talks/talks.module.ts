import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ChartsModule } from "ng2-charts";
import { CoSpeakerFormComponent } from "./components/co-speaker-form/co-speaker-form.component";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TalkDetailComponent } from "./pages/talk-detail/talk-detail.component";
import { TalkFormComponent } from "./pages/talk-form/talk-form.component";
import { TalkListComponent } from "./pages/talk-list/talk-list.component";
import { TalkPreviewComponent } from "./components/talk-preview/talk-preview.component";
import { TalksRoutingModule } from "./talks-routing.module";
import { WarningDialogComponent } from "./components/warning-dialog/warning-dialog.component";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
@NgModule({
  declarations: [
    TalkListComponent,
    TalkDetailComponent,
    TalkPreviewComponent,
    WarningDialogComponent,
    TalkFormComponent,
    CoSpeakerFormComponent,
    TalkFormComponent,
  ],
  imports: [
    CommonModule,
    TalksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    FontAwesomeModule,
    MatDialogModule,
    MatChipsModule,
    MatPaginatorModule,
    ChartsModule,
    SharedModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
})
export class TalksModule {}
