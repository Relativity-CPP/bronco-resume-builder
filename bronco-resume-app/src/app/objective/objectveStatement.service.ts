import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ObjectiveStatement } from './objectiveStatement.model';

@Injectable({providedIn: 'root'})
export class ObjectiveStatementService {
    private objectiveStatement: ObjectiveStatement = null;
    private objectiveStatementUpdated = new Subject<ObjectiveStatement>();

    getObjectiveStatement() {
        return Object.create(this.objectiveStatement);
    }

    addObjectiveStatement(objectiveStatement: ObjectiveStatement) {
        this.objectiveStatement = {
            statement: objectiveStatement.statement,
        };
        this.objectiveStatementUpdated.next(Object.create(this.objectiveStatement));
    }

    getObjectiveStatementUpdateListener() {
        return this.objectiveStatementUpdated.asObservable();
    }
}
