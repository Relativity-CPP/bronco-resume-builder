import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
} from '@angular/material';

import { AppComponent } from './app.component';
import { ContactInfoCreateComponent} from './contact-info/contact-info-create/contact-info-create.component';
import { EducationCreateComponent } from './education/education-create/education-create.component';
import { EducationListComponent } from './education/education-list/education-list.component';
import { AwardCreateComponent } from './awards/award-create/award-create.component';
import { AwardListComponent } from './awards/award-list/award-list.component';
import { ExperienceCreateComponent } from './experience/exerpience-create/experience-create.component';
import { ExperienceListComponent } from './experience/experience-list/experience-list.component';
import { ObjectiveCreateComponent } from './objective/objective-create/objective-create.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { SkillCreateComponent } from './skills/skill-create/skill-create.component';
import { SkillListComponent } from './skills/skill-list/skill-list/skill-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactInfoCreateComponent,
    EducationCreateComponent,
    EducationListComponent,
    AwardCreateComponent,
    AwardListComponent,
    ExperienceCreateComponent,
    ExperienceListComponent,
    ObjectiveCreateComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    SkillCreateComponent,
    SkillListComponent,
    HeaderComponent,
  ],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
