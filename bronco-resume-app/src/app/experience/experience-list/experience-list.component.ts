import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';
import { AuthService } from 'src/app/auth/auth.service';
import { EducationService } from 'src/app/education/education.service';
import { Education } from 'src/app/education/education.model';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit, OnDestroy {
  experienceList: Experience[] = [];
  educationList: Education[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private experienceSub: Subscription;
  private authStatusSub: Subscription;
  private educationSub: Subscription;

  constructor(
    public experienceService: ExperienceService,
    private authService: AuthService,
    private educationService: EducationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.experienceService.getExperience();
    this.experienceSub = this.experienceService
      .getExperienceUpdateListener()
      .subscribe((experience: Experience[]) => {
        this.isLoading = false;
        this.experienceList = experience;
      });
    this.educationService.getEducation();
    this.educationSub = this.educationService
      .getEducationUpdateListener()
      .subscribe((education: Education[]) => {
        this.isLoading = false;
        this.educationList = education;
      });
  }
  onDelete(experienceId: string) {
    this.experienceService.deleteExperience(experienceId);
  }
  ngOnDestroy() {
    this.experienceSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.educationSub.unsubscribe();
  }
  hasMajor(major: string) {
    return this.educationList.filter(ed => ed.major === major).length > 0;
  }
}
