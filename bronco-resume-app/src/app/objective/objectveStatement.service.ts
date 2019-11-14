import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


import { ObjectiveStatement } from './objectiveStatement.model';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/objective';

@Injectable({providedIn: 'root'})
export class ObjectiveStatementService {
    private objectiveStatement: ObjectiveStatement = null;
    private objectiveStatementUpdated = new Subject<ObjectiveStatement>();

    constructor(private http: HttpClient, private router: Router) {}

    getObjectiveStatement() {
        this.http
        .get<{message: string, objectiveStatement: any}>(
          BACKEND_URL
          )
        .pipe(map((objectiveData) => {
          return objectiveData.objectiveStatement.map(objective => {
            return {
            statement: objective.statement,
            id: objective._id,
            creator: objective.creator
          };
        });
      }))
      .subscribe((transformedObjectiveStatementData) => {
        if (transformedObjectiveStatementData.length > 0) {
          this.objectiveStatement = transformedObjectiveStatementData[0];
          this.objectiveStatementUpdated.next(Object.create(this.objectiveStatement));
        }
      });
    }

    addObjectiveStatement(objectiveStatement: ObjectiveStatement) {
        this.objectiveStatement = {
            id: null,
            statement: objectiveStatement.statement,
        };
        this.http.post<{message: string, objectiveId: string}>(
          BACKEND_URL, objectiveStatement)
          .subscribe((responseData) => {
            console.log(responseData);
            const id = responseData.objectiveId;
            objectiveStatement.id = id;
            this.objectiveStatementUpdated.next(Object.create(this.objectiveStatement));
            this.router.navigate(['/objective']);
          });
    }
    updateObjective(id: string, objective: ObjectiveStatement) {
      this.http.put(BACKEND_URL + '/' + id, objective)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/objective']);
      });
    }
    getObjectiveStatementUpdateListener() {
        return this.objectiveStatementUpdated.asObservable();
    }
    getObjectiveClone() {
      return {...this.objectiveStatement};
    }
}
