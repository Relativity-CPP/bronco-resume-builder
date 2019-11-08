import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { ResumeInfoComponent } from './resume-info/resume-info/resume-info.component';
import { ContactInfoCreateComponent } from './contact-info/contact-info-create/contact-info-create.component';

const routes: Routes = [
  {path: '', component: SignupComponent},
  {path: 'edit/contact/:contactId', component: ContactInfoCreateComponent},
  {path: 'createContact', component: ContactInfoCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
