import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./pages/profile/profile.component";
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  declarations: [ProfileComponent, UserFormComponent],
})
export class UserModule {}
