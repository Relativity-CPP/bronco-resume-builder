import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResumeInfoComponent } from './resume-info/resume-info/resume-info.component';
import { ContactInfoCreateComponent } from './contact-info/contact-info-create/contact-info-create.component';
import { AwardCreateComponent } from './awards/award-create/award-create.component';
import { AuthGuard } from './auth/auth.guards';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'resume', component: ResumeInfoComponent, canActivate: [AuthGuard]},
  {path: 'edit/contact/:contactId', component: ContactInfoCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/award/:awardId', component: AwardCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/contact', component: ContactInfoCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/award', component: AwardCreateComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},

];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
