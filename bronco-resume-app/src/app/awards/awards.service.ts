import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Award } from './award.model';

import {DatePipe, formatDate} from '@angular/common';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AwardsService {
    private awards: Award[] = [];
    private awardsUpdated = new Subject<Award[]>();

  constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient, private router: Router) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }

  getAwards() {
    this.http
      .get<{ message: string; awards: any }>(
        'http://localhost:3000/api/awards'
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
      .post<{ message: string, awardId: string }>('http://localhost:3000/api/awards', award)
      .subscribe(responseData => {
        const id = responseData.awardId;
        award.id = id;
        this.awards.push(award);
        this.awardsUpdated.next([...this.awards]);
        this.router.navigate(['/resume']);
    });
  }
  updateAward(id: string, award: Award) {
    this.http.put('http://localhost:3000/api/awards/' + id, award)
      .subscribe(response => {
        const updatedAwards = [...this.awards];
        const oldAwardIndex = updatedAwards.findIndex(a => a.id === award.id);
        updatedAwards[oldAwardIndex] = award;
        this.awardsUpdated.next([...this.awards]);
        this.router.navigate(['/resume']);
      });
  }
  deleteAward(awardId: string) {
    this.http.delete('http://localhost:3000/api/awards/' + awardId)
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
      'http://localhost:3000/api/awards/' + id);
  }
  getAwardsListClone() {
    return {...this.awards};
  }
}
