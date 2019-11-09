import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';

@Component ({
  selector: 'app-experience-create',
  templateUrl: './experience-create.component.html',
  styleUrls: ['./experience-create.component.css']
})

export class ExperienceCreateComponent {

  constructor(public experienceService: ExperienceService) {}

  onAddExperience(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const expStartDate = this.experienceService.transformDate(form.value.jobStartDate);
    const expEndDate = this.experienceService.transformDate(form.value.jobEndDate);
    const experience: Experience = {
      id: '',
      companyName: form.value.companyName,
      jobTitle: form.value.jobTitle,
      jobStartDate: expStartDate,
      jobEndDate: expEndDate,
      description: form.value.description
    };
    this.experienceService.addExperience(experience);
    form.resetForm();
  }
}
