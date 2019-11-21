import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { EducationService } from 'src/app/education/education.service';
import { Education } from 'src/app/education/education.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projectList: Project[] = [];
  educationList: Education[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private projectSub: Subscription;
  private authStatusSub: Subscription;
  private educationSub: Subscription;

  constructor(
    public projectService: ProjectService,
    private authService: AuthService,
    private educationService: EducationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.projectService.getProject();
    this.projectSub = this.projectService
      .getProjectUpdateListener()
      .subscribe((project: Project[]) => {
        this.isLoading = false;
        this.projectList = project;
      });
    this.educationService.getEducation();
    this.educationSub = this.educationService
      .getEducationUpdateListener()
      .subscribe((education: Education[]) => {
        this.isLoading = false;
        this.educationList = education;
      });
  }
  onDelete(projectId: string) {
    this.projectService.deleteProject(projectId);
  }
  ngOnDestroy() {
    this.projectSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.educationSub.unsubscribe();
  }
  hasMajor(major: string) {
    return this.educationList.filter(ed => ed.major === major).length > 0;
  }
}
