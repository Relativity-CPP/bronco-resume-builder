import { Inject, Injectable, LOCALE_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project.model';

import { formatDate } from '@angular/common';

@Injectable({providedIn: 'root'})
export class ProjectService {
    private projectList: Project[] = [];
    private projectListUpdated = new Subject<Project[]>();

  constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }
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
            endDate: project.endDate,
            id: project._id
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
      .post<{ message: string, projectId: string }>('http://localhost:3000/api/projects', project)
      .subscribe(responseData => {
        const id = responseData.projectId;
        project.id = id;
        this.projectList.push(project);
        this.projectListUpdated.next([...this.projectList]);
        console.log(responseData.message);
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
  getProjectUpdateListener() {
    return this.projectListUpdated.asObservable();
  }
}
