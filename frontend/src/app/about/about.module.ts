import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { AboutRoutingModule } from "./about-routing.module";
import { FacebookDeleteDataComponent } from './pages/facebook-delete-data/facebook-delete-data.component';

@NgModule({
  declarations: [PrivacyPolicyComponent, FacebookDeleteDataComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
