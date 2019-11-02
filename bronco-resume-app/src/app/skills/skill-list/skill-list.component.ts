import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Skill } from '../skill.model';
import { SkillService } from '../skill.service';

@Component ({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})

export class SkillListComponent implements OnInit, OnDestroy {
  skillList: Skill[] = [];
  private skillSub: Subscription;

  constructor(public skillService: SkillService) {}

  ngOnInit() {
    this.skillService.getSkill();
    this.skillSub = this.skillService.getSkillUpdateListener()
      .subscribe((skills: Skill[]) => {
        this.skillList = skills;
      });
  }
  onDelete(skillId: string) {
    this.skillService.deleteSkill(skillId);
  }
  ngOnDestroy() {
    this.skillSub.unsubscribe();
  }
}
