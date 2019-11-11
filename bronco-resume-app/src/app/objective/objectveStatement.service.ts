import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


import { ObjectiveStatement } from './objectiveStatement.model';

@Injectable({providedIn: 'root'})
export class ObjectiveStatementService {
    private objectiveStatement: ObjectiveStatement = null;
    private objectiveStatementUpdated = new Subject<ObjectiveStatement>();

    constructor(private http: HttpClient, private router: Router) {}

    getObjectiveStatement() {
        this.http
        .get<{message: string, objectiveStatement: any}>(
          'http://localhost:3000/api/objective'
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
        this.http.post<{message: string, objectiveId: string}>('http://localhost:3000/api/objective', objectiveStatement)
          .subscribe((responseData) => {
            console.log(responseData);
            const id = responseData.objectiveId;
            objectiveStatement.id = id;
            this.objectiveStatementUpdated.next(Object.create(this.objectiveStatement));
            this.router.navigate(['/resume']);
          });
    }
    updateObjective(id: string, objective: ObjectiveStatement) {
      this.http.put('http://localhost:3000/api/objective/' + id, objective)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/resume']);
      });
    }
    getObjectiveStatementUpdateListener() {
        return this.objectiveStatementUpdated.asObservable();
    }
    getObjectiveClone() {
      return {...this.objectiveStatement};
    }
}
