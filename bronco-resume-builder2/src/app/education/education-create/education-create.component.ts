import { Component, Output, EventEmitter } from '@angular/core';
import { Education } from 'src/app/education/education';

@Component ({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.css']
})

export class EducationCreateComponent {
  enteredSchoolName = '';
  selectedDegreeType = '';
  enteredStartDate = new Date();
  enteredEndDate = new Date();
  enteredMajor = '';
  enteredGPA = '';

  @Output() educationCreated = new EventEmitter<Education>();

  onAddEducation() {
    const education: Education = {
      schoolName: this.enteredSchoolName,
      degreeType: this.selectedDegreeType,
      schoolStartDate: this.enteredStartDate,
      schoolEndDate: this.enteredEndDate,
      major: this.enteredMajor,
      gpa: this.enteredGPA,
    };
    this.educationCreated.emit(education);
  }
}
