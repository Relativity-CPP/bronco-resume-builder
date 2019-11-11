import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component ({
  selector: 'app-experience-create',
  templateUrl: './experience-create.component.html',
  styleUrls: ['./experience-create.component.css']
})

export class ExperienceCreateComponent implements OnInit {
  private mode = 'create';
  private experienceId: string;
  experience: Experience;
  isLoading = false;

  constructor(public experienceService: ExperienceService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('experienceId')) {
        this.mode = 'edit';
        this.experienceId = paramMap.get('experienceId');
        this.isLoading = true;
        this.experienceService.getOneExperience(this.experienceId).subscribe(experienceData => {
          this.isLoading = false;
          this.experience = {
            id: experienceData._id,
            companyName: experienceData.companyName,
            jobTitle: experienceData.jobTitle,
            jobStartDate: experienceData.jobStartDate,
            jobEndDate: experienceData.jobEndDate,
            description: experienceData.description
          };
        });
      } else {
        this.mode = 'create';
        this.experienceId = null;
      }
    });
  }
  onSaveExperience(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      const experience: Experience = {
        id: '',
        companyName: form.value.companyName,
        jobTitle: form.value.jobTitle,
        jobStartDate: form.value.jobStartDate,
        jobEndDate: form.value.jobEndDate,
        description: form.value.description
      };
      this.experienceService.addExperience(experience);
    } else {
      const experience: Experience = {
        id: this.experienceId,
        companyName: form.value.companyName,
        jobTitle: form.value.jobTitle,
        jobStartDate: form.value.jobStartDate,
        jobEndDate: form.value.jobEndDate,
        description: form.value.description
      };
      this.experienceService.addExperience(experience);
    }
    form.resetForm();
  }
}
