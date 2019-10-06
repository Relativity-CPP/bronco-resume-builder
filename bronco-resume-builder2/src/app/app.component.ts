import { Component } from '@angular/core';

import { ContactInfo } from './contact-info/contact-info';
import { ObjectiveStatement } from './objective/objectiveStatement';
import { Education } from './education/education';
import { Experience } from './experience/experience';
import { Project } from './projects/project';
import { Skill } from './skills/skill';
import { Award } from './awards/award';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contactInfo: ContactInfo = {
    firstName: '',
    lastName: '',
    homeAddress: '',
    phoneNumber: '',
    emailAddress: '',
    socialMediaLink: ''
  };
  objectiveStatement: ObjectiveStatement = {
    statement: ''
  };
  educations: Education[] = [];
  experiences: Experience[] = [];
  projects: Project[] = [];
  skills: Skill[] = [];
  awards: Award[] = [];
  onContactInfoAdded(contactInfo: ContactInfo) {
    this.contactInfo = contactInfo;
  }
  onObjectiveStatementAdded(objectiveStatement: ObjectiveStatement) {
    this.objectiveStatement = objectiveStatement;
  }
  onEducationAdded(education: Education) {
    this.educations.push(education);
    alert('There are ' + this.educations.length + ' educations');
  }
  onExperienceAdded(experience: Experience) {
    this.experiences.push(experience);
    alert('There are ' + this.experiences.length + ' jobs');
  }
  onProjectAdded(project: Project) {
    this.projects.push(project);
    alert('There are ' + this.projects.length + ' projects');
  }
  onSkillAdded(skill: Skill) {
    this.skills.push(skill);
    alert('There are ' + this.skills.length + ' skills');
  }
  onAwardAdded(award: Award) {
    this.awards.push(award);
  }
}
