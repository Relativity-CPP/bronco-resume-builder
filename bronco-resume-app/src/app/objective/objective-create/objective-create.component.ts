import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ObjectiveStatement } from 'src/app/objective/objectiveStatement.model';
import { ObjectiveStatementService } from '../objectveStatement.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component ({
  selector: 'app-objective-create',
  templateUrl: './objective-create.component.html',
  styleUrls: ['./objective-create.component.css']
})

export class ObjectiveCreateComponent implements OnInit {

  objective: ObjectiveStatement = null;
  private mode = 'create';
  private objectiveId: string;
  isLoading = false;

  constructor(public objectiveStatementService: ObjectiveStatementService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('objectiveId')) {
        this.mode = 'edit';
        this.objectiveId = paramMap.get('objectiveId');
        console.log(this.objectiveId);
        this.isLoading = true;
        this.objective = this.objectiveStatementService.getObjectiveClone();
        console.log(this.objective);
      } else {
        this.mode = 'create';
        this.objectiveId = null;
      }
    });
  }

  onSaveObjectiveStatement(form: NgForm) {
    if (this.mode === 'create') {
      const objective: ObjectiveStatement = {
        id: null,
        statement: form.value.statement
      };
      this.objectiveStatementService.addObjectiveStatement(objective);
    } else {
      const objective: ObjectiveStatement = {
        id: this.objectiveId,
        statement: form.value.statement
      };
      this.objectiveStatementService.updateObjective(this.objectiveId, objective);
    }
    this.isLoading = true;
  }
}
