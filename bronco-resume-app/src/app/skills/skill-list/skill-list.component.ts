import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Skill } from '../skill.model';
import { SkillsService } from '../skill.service';

@Component ({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})

export class SkillListComponent implements OnInit, OnDestroy {
  skillList: Skill[] = [];
  private skillsSub: Subscription;

  constructor(public skillsService: SkillsService) {}

  ngOnInit() {
    this.skillList = this.skillsService.getSkills();
    this.skillsSub = this.skillsService.getSkillUpdateListener()
      .subscribe((skills: Skill[]) => {
        this.skillList = skills;
      });
  }
  ngOnDestroy() {
    this.skillsSub.unsubscribe();
  }
}
