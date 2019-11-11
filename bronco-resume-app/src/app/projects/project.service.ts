import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ProjectService {
    private projectList: Project[] = [];
    private projectListUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProject() {
    this.http
      .get<{ message: string; project: any }>(
        'http://localhost:3000/api/projects'
      )
      .pipe(map((projectData) => {
        return projectData.project.map(project => {
          return {
            title: project.title,
            startDate: project.startDate,
            description: project.description,
            endDate: project.endDate,
            id: project._id,
            creator: project.creator
          };
        });
      }))
      .subscribe(transformedProjects => {
        this.projectList = transformedProjects;
        this.projectListUpdated.next([...this.projectList]);
    });
  }
  addProject(project: Project) {
    this.http
      .post<{ message: string, projectId: string }>(
        'http://localhost:3000/api/projects', project)
      .subscribe(responseData => {
        const id = responseData.projectId;
        project.id = id;
        this.projectList.push(project);
        this.projectListUpdated.next([...this.projectList]);
        console.log(responseData.message);
        this.router.navigate(['/resume']);
    });
  }
  updateEducation(id: string, project: Project) {
    this.http.put('http://localhost:3000/api/projects/' + id, project)
      .subscribe(response => {
        const updatedProjects = [...this.projectList];
        const oldProjectIndex = updatedProjects.findIndex(a => a.id === project.id);
        updatedProjects[oldProjectIndex] = project;
        this.projectListUpdated.next([...this.projectList]);
        this.router.navigate(['/resume']);
      });
  }
  deleteProject(projectId: string) {
    this.http.delete('http://localhost:3000/api/projects/' + projectId)
      .subscribe(() => {
        const updatedProjectList = this.projectList.filter(project => project.id !== projectId);
        this.projectList = updatedProjectList;
        this.projectListUpdated.next([...this.projectList]);
    });
  }
  getOneExperience(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{message: string, title: string, startDate: string, endDate: string, description: string, _id: string}>(
      'http://localhost:3000/api/projects/' + id);
  }
  getProjectUpdateListener() {
    return this.projectListUpdated.asObservable();
  }
  getProjectListClone() {
    return {...this.projectList};
  }
}
