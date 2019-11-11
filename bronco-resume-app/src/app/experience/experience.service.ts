import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Experience } from './experience.model';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ExperienceService {
  private experienceList: Experience[] = [];
  private experienceListUpdated = new Subject<Experience[]>();

  constructor(private http: HttpClient, private router: Router) {}

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
            id: experience._id,
            creator: experience.creator
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
      .post<{ message: string, experienceId: string }>(
        'http://localhost:3000/api/experience', experience)
      .subscribe(responseData => {
        const id = responseData.experienceId;
        experience.id = id;
        this.experienceList.push(experience);
        this.experienceListUpdated.next([...this.experienceList]);
        console.log(responseData.message);
        this.router.navigate(['/resume']);
    });
  }
  updateExperience(id: string, experience: Experience) {
    this.http.put('http://localhost:3000/api/experience/' + id, experience)
      .subscribe(response => {
        const updatedExperiences = [...this.experienceList];
        const oldExperienceIndex = updatedExperiences.findIndex(a => a.id === experience.id);
        updatedExperiences[oldExperienceIndex] = experience;
        this.experienceListUpdated.next([...this.experienceList]);
        this.router.navigate(['/resume']);
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
  getOneExperience(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{message: string, companyName: string, jobTitle: string, jobStartDate: string, jobEndDate: string, description: string, _id: string}>(
      'http://localhost:3000/api/experience/' + id);
  }
  getExperienceUpdateListener() {
    return this.experienceListUpdated.asObservable();
  }
  getExperienceListClone() {
    return {...this.experienceList};
  }
}
