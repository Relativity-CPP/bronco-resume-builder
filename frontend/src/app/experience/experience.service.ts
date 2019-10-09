import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Experience } from './experience.model';

@Injectable({providedIn: 'root'})
export class ExperienceService {
    private experienceList: Experience[] = [];
    private experienceListUpdated = new Subject<Experience[]>();

    getExperience() {
        return [...this.experienceList];
    }

    addExperience(experience: Experience) {
        this.experienceList.push(experience);
        this.experienceListUpdated.next([...this.experienceList]);
    }

    getExperienceUpdateListener() {
        return this.experienceListUpdated.asObservable();
    }
}
