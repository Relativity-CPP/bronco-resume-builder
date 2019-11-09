import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { ContactInfoCreateComponent} from './contact-info/contact-info-create/contact-info-create.component';
import { ContactInfoListComponent } from './contact-info/contact-info-list/contact-info-list.component';
import { EducationCreateComponent } from './education/education-create/education-create.component';
import { EducationListComponent } from './education/education-list/education-list.component';
import { AwardCreateComponent } from './awards/award-create/award-create.component';
import { AwardListComponent } from './awards/award-list/award-list.component';
import { ExperienceCreateComponent } from './experience/experience-create/experience-create.component';
import { ExperienceListComponent } from './experience/experience-list/experience-list.component';
import { ObjectiveCreateComponent } from './objective/objective-create/objective-create.component';
import { ObjectiveListComponent } from './objective/objective-list/objective-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { SkillCreateComponent } from './skills/skill-create/skill-create.component';
import { SkillListComponent } from './skills/skill-list/skill-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';
import { ResumeInfoComponent } from './resume-info/resume-info/resume-info.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactInfoCreateComponent,
    ContactInfoListComponent,
    EducationCreateComponent,
    EducationListComponent,
    AwardCreateComponent,
    AwardListComponent,
    ExperienceCreateComponent,
    ExperienceListComponent,
    ObjectiveCreateComponent,
    ObjectiveListComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    ResumeInfoComponent,
    SkillCreateComponent,
    SkillListComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
