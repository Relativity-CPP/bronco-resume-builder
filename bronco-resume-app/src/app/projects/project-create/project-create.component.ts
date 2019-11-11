import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Project } from 'src/app/projects/project.model';
import { ProjectService } from '../project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component ({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})

export class ProjectCreateComponent implements OnInit {
  private mode = 'create';
  private projectId: string;
  project: Project;
  isLoading = false;

  constructor(public projectService: ProjectService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.mode = 'edit';
        this.projectId = paramMap.get('projectId');
        this.isLoading = true;
        this.projectService.getOneExperience(this.projectId).subscribe(projectData => {
          this.isLoading = false;
          this.project = {
            id: projectData._id,
            title: projectData.title,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            description: projectData.description
          };
        });
      } else {
        this.mode = 'create';
        this.projectId = null;
      }
    });
  }

  onSaveProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      const project: Project = {
        id: '',
        title: form.value.title,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        description: form.value.description
      };
      this.projectService.addProject(project);
    } else {
      const project: Project = {
        id: this.projectId,
        title: form.value.title,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        description: form.value.description
      };
      this.projectService.updateProject(this.projectId, project);
    }
    form.resetForm();
  }
}
