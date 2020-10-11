import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Education } from './education.model';

import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/education';

@Injectable({ providedIn: 'root' })
export class EducationService {
  private educationList: Education[] = [];
  private educationListUpdated = new Subject<Education[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getEducation() {
    this.http
      .get<{ message: string; education: any }>(BACKEND_URL)
      .pipe(
        map(educationData => {
          return educationData.education.map(education => {
            return {
              schoolName: education.schoolName,
              degreeType: education.degreeType,
              major: education.major,
              schoolStartDate: education.schoolStartDate,
              schoolEndDate: education.schoolEndDate,
              gpa: education.gpa,
              id: education._id,
              creator: education.creator
            };
          });
        })
      )
      .subscribe(transformedEducation => {
        this.educationList = transformedEducation;
        this.educationListUpdated.next([...this.educationList]);
      });
  }
  addEducation(education: Education) {
    this.http
      .post<{ message: string; educationId: string }>(BACKEND_URL, education)
      .subscribe(responseData => {
        const id = responseData.educationId;
        education.id = id;
        this.educationList.push(education);
        this.educationListUpdated.next([...this.educationList]);
        this.router.navigate(['/education']);
      });
  }
  updateEducation(id: string, education: Education) {
    this.http.put(BACKEND_URL + '/' + id, education).subscribe(response => {
      const updatedEducations = [...this.educationList];
      const oldEducationIndex = updatedEducations.findIndex(
        a => a.id === education.id
      );
      updatedEducations[oldEducationIndex] = education;
      this.educationListUpdated.next([...this.educationList]);
      this.router.navigate(['/education']);
    });
  }
  deleteEducation(educationId: string) {
    this.http.delete(BACKEND_URL + '/' + educationId).subscribe(() => {
      const updatedEducationList = this.educationList.filter(
        education => education.id !== educationId
      );
      this.educationList = updatedEducationList;
      this.educationListUpdated.next([...this.educationList]);
    });
  }
  getEducationUpdateListener() {
    return this.educationListUpdated.asObservable();
  }
  getOneEducation(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{
      message: string;
      schoolName: string;
      degreeType: string;
      major: string;
      schoolStartDate: string;
      schoolEndDate: string;
      gpa: string;
      _id: string;
    }>(BACKEND_URL + '/' + id);
  }
  // startChange
  getEducationListClone() {
    return { ...this.educationList };
  }
}
