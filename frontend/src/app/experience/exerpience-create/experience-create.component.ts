import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Experience } from 'src/app/experience/experience.model';
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
    const experience: Experience = {
      companyName: form.value.companyName,
      jobTitle: form.value.jobTitle,
      jobStartDate: form.value.jobStartDate,
      jobEndDate: form.value.jobEndDate,
      description: form.value.description
    };
    this.experienceService.addExperience(experience);
    form.resetForm();
  }
}
