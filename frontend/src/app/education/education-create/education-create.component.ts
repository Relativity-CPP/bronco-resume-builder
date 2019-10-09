import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Education } from 'src/app/education/education.model';
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
    const education: Education = {
      schoolName: form.value.schoolName,
      degreeType: form.value.degreeType,
      schoolStartDate: form.value.schoolStartDate,
      schoolEndDate: form.value.schoolEndDate,
      major: form.value.major,
      gpa: form.value.GPA,
    };
    this.educationService.addEducation(education);
    form.resetForm();
  }
}
