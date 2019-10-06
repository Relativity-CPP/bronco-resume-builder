import { Component, EventEmitter, Output } from '@angular/core';
import { ObjectiveStatement } from 'src/app/objective/objectiveStatement';

@Component ({
  selector: 'app-objective-create',
  templateUrl: './objective-create.component.html',
  styleUrls: ['./objective-create.component.css']
})

export class ObjectiveCreateComponent {
  enteredObjectiveStatement = '';

  @Output() objectiveStatementCreated = new EventEmitter<ObjectiveStatement>();

  onAddObjectiveStatement() {
    const objectiveStatement: ObjectiveStatement = {
      statement: this.enteredObjectiveStatement
    };
    this.objectiveStatementCreated.emit(objectiveStatement);
  }
}
