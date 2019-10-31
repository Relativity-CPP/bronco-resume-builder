import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { ObjectiveStatement } from './objectiveStatement.model';

@Injectable({providedIn: 'root'})
export class ObjectiveStatementService {
    private objectiveStatement: ObjectiveStatement = {
      id: null,
      statement: ''
    };
    private objectiveStatementUpdated = new Subject<ObjectiveStatement>();

    constructor(private http: HttpClient) {}

    getObjectiveStatement() {
        this.http.get<{message: string, objectiveStatement: ObjectiveStatement}>('http://localhost:3000/api/objective')
        .subscribe((objectiveStatementData) => {
          console.log(objectiveStatementData.message);
          this.objectiveStatement = objectiveStatementData.objectiveStatement;
          this.objectiveStatementUpdated.next(Object.create(this.objectiveStatement));
        });
    }

    addObjectiveStatement(objectiveStatement: ObjectiveStatement) {
        this.objectiveStatement = {
            id: null,
            statement: objectiveStatement.statement,
        };
        this.http.post<{message: string}>('http://localhost:3000/api/objective', objectiveStatement)
          .subscribe((responseData) => {
            console.log(responseData.message);
            this.objectiveStatementUpdated.next(Object.create(this.objectiveStatement));
          });
    }

    getObjectiveStatementUpdateListener() {
        return this.objectiveStatementUpdated.asObservable();
    }
}
