import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Experience } from 'src/app/experience/experience.model';
import { ExperienceService } from 'src/app/experience/experience.service';

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
    this.experienceList = this.experienceService.getExperience();
    this.experienceSub = this.experienceService.getExperienceUpdateListener()
      .subscribe((experience: Experience[]) => {
        this.experienceList = experience;
      });
  }

  ngOnDestroy() {
    this.experienceSub.unsubscribe();
  }
}
