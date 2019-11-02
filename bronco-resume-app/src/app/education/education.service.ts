import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Education } from './education.model';

import {DatePipe, formatDate} from '@angular/common';

@Injectable({providedIn: 'root'})
export class EducationService {
    private educationList: Education[] = [];
    private educationListUpdated = new Subject<Education[]>();

  constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient) {}

  transformDate(date) {
    return formatDate(date, 'MM/dd/yyyy', this.locale);
  }
  getEducation() {
    this.http
      .get<{ message: string; education: any }>(
        'http://localhost:3000/api/education'
      )
      .pipe(map((educationData) => {
        return educationData.education.map(education => {
          return {
            schoolName: education.schoolName,
            degreeType: education.degreeType,
            major: education.major,
            schoolStartDate: education.schoolStartDate,
            schoolEndDate: education.schoolEndDate,
            gpa: education.gpa,
            id: education._id
          };
        });
      }))
      .subscribe(transformedEducation => {
        this.educationList = transformedEducation;
        this.educationListUpdated.next([...this.educationList]);
    });
  }
  addEducation(education: Education) {
    this.http
      .post<{ message: string, educationId: string }>('http://localhost:3000/api/education', education)
      .subscribe(responseData => {
        const id = responseData.educationId;
        education.id = id;
        this.educationList.push(education);
        this.educationListUpdated.next([...this.educationList]);
        console.log(responseData.message);
    });
  }
  deleteEducation(educationId: string) {
    this.http.delete('http://localhost:3000/api/education/' + educationId)
      .subscribe(() => {
        const updatedEducationList = this.educationList.filter(education => education.id !== educationId);
        this.educationList = updatedEducationList;
        this.educationListUpdated.next([...this.educationList]);
    });
  }
  getEducationUpdateListener() {
    return this.educationListUpdated.asObservable();
  }
}
