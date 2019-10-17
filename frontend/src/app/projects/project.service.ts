import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { Subject } from 'rxjs';

import { Project } from './project.model';

import {DatePipe, formatDate} from '@angular/common';
@Injectable({providedIn: 'root'})
export class ProjectService {
    private projectList: Project[] = [];
    private projectListUpdated = new Subject<Project[]>();

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }
    getProjects() {
        return [...this.projectList];
    }

    addProject(project: Project) {
        this.projectList.push(project);
        this.projectListUpdated.next([...this.projectList]);
    }

    getProjectsUpdateListener() {
        return this.projectListUpdated.asObservable();
    }
}
