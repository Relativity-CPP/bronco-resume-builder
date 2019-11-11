import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component ({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit, OnDestroy {
  projectList: Project[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private projectSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public projectService: ProjectService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService.getProject();
    this.projectSub = this.projectService.getProjectUpdateListener()
    .subscribe((project: Project[]) => {
      this.isLoading = false;
      this.projectList = project;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe( isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onDelete(projectId: string) {
    this.projectService.deleteProject(projectId);
  }
  ngOnDestroy() {
    this.projectSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
