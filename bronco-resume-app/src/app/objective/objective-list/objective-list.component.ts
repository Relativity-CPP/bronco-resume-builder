import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ObjectiveStatement } from 'src/app/objective/objectiveStatement.model';
import { ObjectiveStatementService } from '../objectveStatement.service';

@Component ({
  selector: 'app-objective-list',
  templateUrl: './objective-list.component.html',
  styleUrls: ['./objective-list.component.css']
})

export class ObjectiveListComponent implements OnInit, OnDestroy {
  objectiveStatement: ObjectiveStatement;
  private objectiveStatementSub: Subscription;

  constructor(public objectiveStatementService: ObjectiveStatementService) {}

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
