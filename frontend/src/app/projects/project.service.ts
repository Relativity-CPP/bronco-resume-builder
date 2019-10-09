import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Project } from './project.model';

@Injectable({providedIn: 'root'})
export class ProjectService {
    private projectList: Project[] = [];
    private projectListUpdated = new Subject<Project[]>();

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
