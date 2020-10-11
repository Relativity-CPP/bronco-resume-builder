import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Skill } from '../skill.model';
import { SkillService } from '../skill.service';
import { AuthService } from 'src/app/auth/auth.service';
import { EducationService } from 'src/app/education/education.service';
import { Education } from 'src/app/education/education.model';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit, OnDestroy {
  skillList: Skill[] = [];
  educationList: Education[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private skillSub: Subscription;
  private authStatusSub: Subscription;
  private educationSub: Subscription;
  constructor(
    public skillService: SkillService,
    private educationService: EducationService,
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
    this.skillService.getSkill();
    this.skillSub = this.skillService
      .getSkillUpdateListener()
      .subscribe((skills: Skill[]) => {
        this.isLoading = false;
        this.skillList = skills;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onDelete(skillId: string) {
    this.skillService.deleteSkill(skillId);
  }
  ngOnDestroy() {
    this.skillSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.educationSub.unsubscribe();
  }
  onAddCsSkill(skillName: string) {
    const skill: Skill = {
      id: '',
      description: skillName
    };
    this.skillService.addSkill(skill);
  }

  hasSkill(skillName: string) {
    return (
      this.skillList.filter(skill => skill.description === skillName).length > 0
    );
  }
  hasMajor(major: string) {
    return this.educationList.filter(ed => ed.major === major).length > 0;
  }
}
