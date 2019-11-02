import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Experience } from '../experience.model';
import { ExperienceService } from '../experience.service';

@Component ({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})

export class ExperienceListComponent implements OnInit, OnDestroy {
  experienceList: Experience[] = [];
  private experienceSub: Subscription;

  constructor(public experienceService: ExperienceService) {}

  ngOnInit() {
    this.experienceService.getExperience();
    this.experienceSub = this.experienceService.getExperienceUpdateListener()
      .subscribe((experience: Experience[]) => {
        this.experienceList = experience;
      });
  }
  onDelete(experienceId: string) {
    this.experienceService.deleteExperience(experienceId);
  }
  ngOnDestroy() {
    this.experienceSub.unsubscribe();
  }
}
