import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Award } from './award.model';

import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/awards';

@Injectable({providedIn: 'root'})
export class AwardsService {
    private awards: Award[] = [];
    private awardsUpdated = new Subject<Award[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getAwards() {
    this.http
      .get<{ message: string; awards: any }>(
        BACKEND_URL
      )
      .pipe(map((awardData) => {
        return awardData.awards.map(award => {
          return {
            title: award.title,
            date: award.date,
            description: award.description,
            id: award._id,
            creator: award.creator
          };
        });
      }))
      .subscribe(transformedAwards => {
        this.awards = transformedAwards;
        this.awardsUpdated.next([...this.awards]);
    });
  }
  addAward(award: Award) {
    this.http
      .post<{ message: string, awardId: string }>(
        BACKEND_URL, award)
      .subscribe(responseData => {
        const id = responseData.awardId;
        award.id = id;
        this.awards.push(award);
        this.awardsUpdated.next([...this.awards]);
        this.router.navigate(['/awards']);
    });
  }
  updateAward(id: string, award: Award) {
    this.http.put(BACKEND_URL + '/' + id, award)
      .subscribe(response => {
        const updatedAwards = [...this.awards];
        const oldAwardIndex = updatedAwards.findIndex(a => a.id === award.id);
        updatedAwards[oldAwardIndex] = award;
        this.awardsUpdated.next([...this.awards]);
        this.router.navigate(['/awards']);
      });
  }
  deleteAward(awardId: string) {
    this.http.delete(BACKEND_URL + '/' + awardId)
      .subscribe(() => {
        const updatedAwards = this.awards.filter(award => award.id !== awardId);
        this.awards = updatedAwards;
        this.awardsUpdated.next([...this.awards]);
    });
  }
  getAwardUpdateListener() {
    return this.awardsUpdated.asObservable();
  }
  getAward(id: string) {
    return this.http.get<{message: string, title: string, date: string, description: string, _id: string}>(
      BACKEND_URL + '/' + id);
  }
  getAwardsListClone() {
    return {...this.awards};
  }
}
