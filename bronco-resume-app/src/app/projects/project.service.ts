import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/projects';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectList: Project[] = [];
  private projectListUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProject() {
    this.http
      .get<{ message: string; project: any }>(BACKEND_URL)
      .pipe(
        map(projectData => {
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
        })
      )
      .subscribe(transformedProjects => {
        this.projectList = transformedProjects;
        this.projectListUpdated.next([...this.projectList]);
      });
  }
  addProject(project: Project) {
    this.http
      .post<{ message: string; projectId: string }>(BACKEND_URL, project)
      .subscribe(responseData => {
        const id = responseData.projectId;
        project.id = id;
        this.projectList.push(project);
        this.projectListUpdated.next([...this.projectList]);
        console.log(responseData.message);
        this.router.navigate(['/projects']);
      });
  }
  updateProject(id: string, project: Project) {
    this.http.put(BACKEND_URL + '/' + id, project).subscribe(response => {
      const updatedProjects = [...this.projectList];
      const oldProjectIndex = updatedProjects.findIndex(
        a => a.id === project.id
      );
      updatedProjects[oldProjectIndex] = project;
      this.projectListUpdated.next([...this.projectList]);
      this.router.navigate(['/projects']);
    });
  }
  deleteProject(projectId: string) {
    this.http.delete(BACKEND_URL + '/' + projectId).subscribe(() => {
      const updatedProjectList = this.projectList.filter(
        project => project.id !== projectId
      );
      this.projectList = updatedProjectList;
      this.projectListUpdated.next([...this.projectList]);
    });
  }
  getOneExperience(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{
      message: string;
      title: string;
      startDate: string;
      endDate: string;
      description: string;
      _id: string;
    }>(BACKEND_URL + '/' + id);
  }
  getProjectUpdateListener() {
    return this.projectListUpdated.asObservable();
  }
  getProjectListClone() {
    return { ...this.projectList };
  }
}
