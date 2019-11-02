import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Experience } from './experience.model';

import {DatePipe, formatDate} from '@angular/common';

@Injectable({providedIn: 'root'})
export class ExperienceService {
    private experienceList: Experience[] = [];
    private experienceListUpdated = new Subject<Experience[]>();

  constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }
  getExperience() {
    this.http
      .get<{ message: string; experience: any }>(
        'http://localhost:3000/api/experience'
      )
      .pipe(map((experienceData) => {
        return experienceData.experience.map(experience => {
          return {
            companyName: experience.companyName,
            jobTitle: experience.jobTitle,
            jobStartDate: experience.jobStartDate,
            jobEndDate: experience.jobEndDate,
            description: experience.description,
            id: experience._id
          };
        });
      }))
      .subscribe(transformedExperience => {
        this.experienceList = transformedExperience;
        this.experienceListUpdated.next([...this.experienceList]);
    });
  }
  addExperience(experience: Experience) {
    this.http
      .post<{ message: string, experienceId: string }>('http://localhost:3000/api/experience', experience)
      .subscribe(responseData => {
        const id = responseData.experienceId;
        experience.id = id;
        this.experienceList.push(experience);
        this.experienceListUpdated.next([...this.experienceList]);
        console.log(responseData.message);
    });
  }
  deleteExperience(experienceId: string) {
    this.http.delete('http://localhost:3000/api/experience/' + experienceId)
      .subscribe(() => {
        const updatedExperienceList = this.experienceList.filter(experience => experience.id !== experienceId);
        this.experienceList = updatedExperienceList;
        this.experienceListUpdated.next([...this.experienceList]);
    });
  }
  getExperienceUpdateListener() {
    return this.experienceListUpdated.asObservable();
  }
}
