import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Education } from "../education.model";
import { EducationService } from "../education.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-education-create",
  templateUrl: "./education-create.component.html",
  styleUrls: ["./education-create.component.css"]
})
export class EducationCreateComponent implements OnInit {
  private mode = "create";
  private educationId: string;
  education: Education;
  isLoading = false;
  constructor(
    public educationService: EducationService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("educationId")) {
        this.mode = "edit";
        this.educationId = paramMap.get("educationId");
        this.isLoading = true;
        this.educationService
          .getOneEducation(this.educationId)
          .subscribe(educationData => {
            this.isLoading = false;
            this.education = {
              id: educationData._id,
              schoolName: educationData.schoolName,
              schoolStartDate: educationData.schoolStartDate,
              schoolEndDate: educationData.schoolEndDate,
              major: educationData.major,
              gpa: educationData.gpa,
              degreeType: educationData.degreeType
            };
          });
      } else {
        this.mode = "create";
        this.educationId = null;
      }
    });
  }
  onSaveEducation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      const education: Education = {
        id: "",
        schoolName: form.value.schoolName,
        degreeType: form.value.degreeType,
        schoolStartDate: form.value.schoolStartDate,
        schoolEndDate: form.value.schoolEndDate,
        major: form.value.major,
        gpa: form.value.GPA
      };
      this.educationService.addEducation(education);
    } else {
      const education: Education = {
        id: this.educationId,
        schoolName: form.value.schoolName,
        degreeType: form.value.degreeType,
        schoolStartDate: form.value.schoolStartDate,
        schoolEndDate: form.value.schoolEndDate,
        major: form.value.major,
        gpa: form.value.GPA
      };
      this.educationService.updateEducation(this.educationId, education);
    }
    form.resetForm();
  }
}
