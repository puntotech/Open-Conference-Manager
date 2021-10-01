import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./pages/auth-routing.module";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoadingComponent } from "./pages/loading/loading.component";
import { LoginComponent } from "./pages/login/login.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  declarations: [LoginComponent, LoadingComponent],
})
export class AuthModule {}
