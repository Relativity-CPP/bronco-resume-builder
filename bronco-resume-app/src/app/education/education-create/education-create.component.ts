import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Education } from '../education.model';
import { EducationService } from '../education.service';

@Component ({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.css']
})

export class EducationCreateComponent {

  constructor(public educationService: EducationService) {}

  onAddEducation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const startDate = this.educationService.transformDate(form.value.schoolStartDate);
    const endDate = this.educationService.transformDate(form.value.schoolEndDate);
    const education: Education = {
      id: '',
      schoolName: form.value.schoolName,
      degreeType: form.value.degreeType,
      schoolStartDate: startDate,
      schoolEndDate: endDate,
      major: form.value.major,
      gpa: form.value.GPA,
    };
    this.educationService.addEducation(education);
    form.resetForm();
  }
}
