import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Education } from './education.model';

@Injectable({providedIn: 'root'})
export class EducationService {
    private educationList: Education[] = [];
    private educationListUpdated = new Subject<Education[]>();

    getEducation() {
        return [...this.educationList];
    }

    addEducation(education: Education) {
        this.educationList.push(education);
        this.educationListUpdated.next([...this.educationList]);
        alert('adding shit');
    }

    getEducationUpdateListener() {
        return this.educationListUpdated.asObservable();
    }
}
