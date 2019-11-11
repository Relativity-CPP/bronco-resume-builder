import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResumeInfoComponent } from './resume-info/resume-info/resume-info.component';
import { ContactInfoCreateComponent } from './contact-info/contact-info-create/contact-info-create.component';
import { AwardCreateComponent } from './awards/award-create/award-create.component';
import { EducationCreateComponent } from './education/education-create/education-create.component';
import { ExperienceCreateComponent } from './experience/experience-create/experience-create.component';
import { ObjectiveCreateComponent } from './objective/objective-create/objective-create.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { SkillCreateComponent } from './skills/skill-create/skill-create.component';

import { AuthGuard } from './auth/auth.guards';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'resume', component: ResumeInfoComponent, canActivate: [AuthGuard]},
  {path: 'edit/contact/:contactId', component: ContactInfoCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/award/:awardId', component: AwardCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/education/:educationId', component: EducationCreateComponent, canActivate: [AuthGuard]},


  {path: 'create/contact', component: ContactInfoCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/award', component: AwardCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/education', component: EducationCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/experience', component: ExperienceCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/objective', component: ObjectiveCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/project', component: ProjectCreateComponent, canActivate: [AuthGuard]},
  {path: 'create/skill', component: SkillCreateComponent, canActivate: [AuthGuard]},

  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},

];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
