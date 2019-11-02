import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Project } from 'src/app/projects/project.model';
import { ProjectService } from '../project.service';

@Component ({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})

export class ProjectCreateComponent {
  constructor(public projectService: ProjectService) {}

  onAddProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const formattedStartDate = this.projectService.transformDate(form.value.startDate);
    const formattedEndDate = this.projectService.transformDate(form.value.endDate);
    const project: Project = {
      id: '',
      title: form.value.title,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      description: form.value.description
    };
    this.projectService.addProject(project);
    form.resetForm();
  }
}
