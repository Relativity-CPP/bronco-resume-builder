import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component ({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})

export class ExperienceListComponent implements OnInit, OnDestroy {
  experienceList: Experience[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private experienceSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public experienceService: ExperienceService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.experienceService.getExperience();
    this.experienceSub = this.experienceService.getExperienceUpdateListener()
      .subscribe((experience: Experience[]) => {
        this.isLoading = false;
        this.experienceList = experience;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe( isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onDelete(experienceId: string) {
    this.experienceService.deleteExperience(experienceId);
  }
  ngOnDestroy() {
    this.experienceSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
