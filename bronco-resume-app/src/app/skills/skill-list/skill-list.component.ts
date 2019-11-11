import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Skill } from '../skill.model';
import { SkillService } from '../skill.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component ({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})

export class SkillListComponent implements OnInit, OnDestroy {
  skillList: Skill[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private skillSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public skillService: SkillService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.skillService.getSkill();
    this.skillSub = this.skillService.getSkillUpdateListener()
      .subscribe((skills: Skill[]) => {
        this.isLoading = false;
        this.skillList = skills;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe( isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onDelete(skillId: string) {
    this.skillService.deleteSkill(skillId);
  }
  ngOnDestroy() {
    this.skillSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
