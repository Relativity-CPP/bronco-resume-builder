import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { Subject } from 'rxjs';

import { Education } from './education.model';

import {DatePipe, formatDate} from '@angular/common';
@Injectable({providedIn: 'root'})
export class EducationService {
    private educationList: Education[] = [];
    private educationListUpdated = new Subject<Education[]>();

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }
    getEducation() {
        return [...this.educationList];
    }

    addEducation(education: Education) {
        this.educationList.push(education);
        this.educationListUpdated.next([...this.educationList]);
    }

    getEducationUpdateListener() {
        return this.educationListUpdated.asObservable();
    }
}
