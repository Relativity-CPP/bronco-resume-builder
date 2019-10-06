import { Component, Output, EventEmitter } from '@angular/core';
import { Experience } from 'src/app/experience/experience';

@Component ({
  selector: 'app-experience-create',
  templateUrl: './experience-create.component.html',
  styleUrls: ['./experience-create.component.css']
})

export class ExperienceCreateComponent {
  enteredCompanyName = '';
  enteredJobTitle = '';
  enteredStartDate = new Date();
  enteredEndDate = new Date();
  enteredDescription = '';

  @Output() experienceCreated = new EventEmitter<Experience>();

  onAddExperience() {
    const experience: Experience = {
      companyName: this.enteredCompanyName,
      jobTitle: this.enteredJobTitle,
      jobStartDate: this.enteredStartDate,
      jobEndDate: this.enteredEndDate,
      description: this.enteredDescription
    };
    this.experienceCreated.emit(experience);
  }
}
