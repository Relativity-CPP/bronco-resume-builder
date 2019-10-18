import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { Subject } from 'rxjs';

import { Experience } from './experience.model';

import {DatePipe, formatDate} from '@angular/common';
@Injectable({providedIn: 'root'})
export class ExperienceService {
    private experienceList: Experience[] = [];
    private experienceListUpdated = new Subject<Experience[]>();

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }
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
