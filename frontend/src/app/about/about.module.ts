import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { AboutRoutingModule } from "./about-routing.module";

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
