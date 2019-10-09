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
    const project: Project = {
      title: form.value.title,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      description: form.value.description
    };
    this.projectService.addProject(project);
    form.resetForm();
  }
}
