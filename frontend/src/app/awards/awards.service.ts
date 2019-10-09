import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Award } from './award.model';

@Injectable({providedIn: 'root'})
export class AwardsService {
    private awards: Award[] = [];
    private awardsUpdated = new Subject<Award[]>();

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
