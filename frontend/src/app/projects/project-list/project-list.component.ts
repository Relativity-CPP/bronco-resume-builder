import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component ({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit, OnDestroy {
  projectList: Project[] = [];
  private projectSub: Subscription;

  constructor(public projectService: ProjectService) {}

  ngOnInit() {
    this.projectList = this.projectService.getProjects();
    this.projectSub = this.projectService.getProjectsUpdateListener()
    .subscribe((project: Project[]) => {
      this.projectList = project;
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }
}
