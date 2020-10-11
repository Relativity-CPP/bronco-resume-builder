import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ObjectiveStatement } from 'src/app/objective/objectiveStatement.model';
import { ObjectiveStatementService } from '../objectveStatement.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-objective-list',
  templateUrl: './objective-list.component.html',
  styleUrls: ['./objective-list.component.css']
})
export class ObjectiveListComponent implements OnInit, OnDestroy {
  objectiveStatement: ObjectiveStatement;
  userIsAuthenticated = false;
  isLoading = false;
  private objectiveStatementSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public objectiveStatementService: ObjectiveStatementService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.objectiveStatementService.getObjectiveStatement();
    this.objectiveStatementSub = this.objectiveStatementService
      .getObjectiveStatementUpdateListener()
      .subscribe((objectiveStatement: ObjectiveStatement) => {
        this.isLoading = false;
        this.objectiveStatement = objectiveStatement;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.isLoading = false;
      });
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.objectiveStatementSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
