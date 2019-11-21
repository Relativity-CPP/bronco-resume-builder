import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Education } from '../education.model';
import { EducationService } from '../education.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css']
})
export class EducationListComponent implements OnInit, OnDestroy {
  educationList: Education[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private educationSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public educationService: EducationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.educationService.getEducation();
    this.educationSub = this.educationService
      .getEducationUpdateListener()
      .subscribe((education: Education[]) => {
        this.isLoading = false;
        this.educationList = education;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onDelete(educationId: string) {
    this.educationService.deleteEducation(educationId);
  }
  ngOnDestroy() {
    this.educationSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
