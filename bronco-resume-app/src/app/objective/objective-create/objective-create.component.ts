import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { ObjectiveStatement } from 'src/app/objective/objectiveStatement.model';
import { ObjectiveStatementService } from '../objectveStatement.service';

@Component ({
  selector: 'app-objective-create',
  templateUrl: './objective-create.component.html',
  styleUrls: ['./objective-create.component.css']
})

export class ObjectiveCreateComponent implements OnInit, OnDestroy {
  objectiveStatement: ObjectiveStatement;
  private objectiveStatementSub: Subscription;

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

  ngOnInit() {
    this.objectiveStatementService.getObjectiveStatement();
    this.objectiveStatementSub = this.objectiveStatementService.getObjectiveStatementUpdateListener()
      .subscribe((objectiveStatement: ObjectiveStatement) => {
        this.objectiveStatement = objectiveStatement;
      });
  }

  ngOnDestroy() {
    this.objectiveStatementSub.unsubscribe();
  }
}
