import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Education } from './education.model';

@Injectable({providedIn: 'root'})
export class EducationService {
    private education: Education[] = [];
    private educationUpdated = new Subject<Education[]>();

    getEducation() {
        return [...this.education];
    }

    addEducation(education: Education) {
        this.education.push(education);
        this.educationUpdated.next([...this.education]);
    }

    getEducationUpdateListener() {
        return this.educationUpdated.asObservable();
    }
}
