import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { Subject } from 'rxjs';

import { Award } from './award.model';

import {DatePipe, formatDate} from '@angular/common';
@Injectable({providedIn: 'root'})
export class AwardsService {
    private awards: Award[] = [];
    private awardsUpdated = new Subject<Award[]>();

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }
    getAwards() {
        return [...this.awards];
    }

    addAward(award: Award) {
        this.awards.push(award);
        this.awardsUpdated.next([...this.awards]);
    }

    getAwardUpdateListener() {
        return this.awardsUpdated.asObservable();
    }
}
