import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ObjectiveStatement } from 'src/app/objective/objectiveStatement.model';
import { ObjectiveStatementService } from '../objectveStatement.service';

@Component ({
  selector: 'app-objective-create',
  templateUrl: './objective-create.component.html',
  styleUrls: ['./objective-create.component.css']
})

export class ObjectiveCreateComponent {

  constructor(public objectiveStatementService: ObjectiveStatementService) {}

  onAddObjectiveStatement(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const objectiveStatement: ObjectiveStatement = {
      id: null,
      statement: form.value.statement,
    };
    this.objectiveStatementService.addObjectiveStatement(objectiveStatement);
  }
}
