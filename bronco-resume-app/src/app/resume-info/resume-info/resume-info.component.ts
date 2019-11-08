import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Award } from '../../awards/award.model';
import { AwardsService } from '../../awards/awards.service';
import { ContactInfo } from '../../contact-info/contact-info.model';
import { ContactInfoService } from '../../contact-info/contact-info.service';
import { Education } from '../../education/education.model';
import { EducationService } from '../../education/education.service';
import { Experience } from '../../experience/experience.model';
import { ExperienceService } from '../../experience/experience.service';
import { ObjectiveStatement } from '../../objective/objectiveStatement.model';
import { ObjectiveStatementService } from '../../objective/objectveStatement.service';
import { Project } from '../../projects/project.model';
import { ProjectService } from '../../projects/project.service';
import { Skill } from '../../skills/skill.model';
import { SkillService } from '../../skills/skill.service';

@Component ({
  selector: 'app-resume-info',
  templateUrl: './resume-info.component.html',
  styleUrls: ['./resume-info.component.css']
})

export class ResumeInfoComponent implements OnInit, OnDestroy {
  awardList: Award[] = [];
  contactInfo: ContactInfo = null;
  educationList: Education[] = [];
  experienceList: Experience[] = [];
  objectiveStatement: ObjectiveStatement;
  projectList: Project[] = [];
  skillList: Skill[] = [];
  private skillSub: Subscription;
  private projectSub: Subscription;
  private objectiveStatementSub: Subscription;
  private experienceSub: Subscription;
  private educationSub: Subscription;
  private contactInfoSub: Subscription;
  private awardsSub: Subscription;

  constructor( public awardsService: AwardsService, public contactInfoService: ContactInfoService,
               public educationService: EducationService, public experienceService: ExperienceService,
               public objectiveStatementService: ObjectiveStatementService, public projectService: ProjectService,
               public skillService: SkillService ) {}


  ngOnInit() {
      this.awardsService.getAwards();
      this.contactInfoService.getContactInfo();
      this.objectiveStatementService.getObjectiveStatement();
      this.educationService.getEducation();
      this.experienceService.getExperience();
      this.objectiveStatementService.getObjectiveStatement();
      this.projectService.getProject();
      this.skillService.getSkill();

      this.objectiveStatementSub = this.objectiveStatementService.getObjectiveStatementUpdateListener()
      .subscribe((objectiveStatement: ObjectiveStatement) => {
        this.objectiveStatement = objectiveStatement;
      });
      this.awardsSub = this.awardsService.getAwardUpdateListener()
      .subscribe((awards: Award[]) => {
        this.awardList = awards;
      });
      this.contactInfoSub = this.contactInfoService.getContactInfoUpdateListener()
      .subscribe((contactInfo: ContactInfo) => {
        this.contactInfo = contactInfo;
      });
      this.educationSub = this.educationService.getEducationUpdateListener()
      .subscribe((education: Education[]) => {
        this.educationList = education;
      });
      this.experienceSub = this.experienceService.getExperienceUpdateListener()
      .subscribe((experience: Experience[]) => {
        this.experienceList = experience;
      });
      this.objectiveStatementSub = this.objectiveStatementService.getObjectiveStatementUpdateListener()
      .subscribe((objectiveStatement: ObjectiveStatement) => {
        this.objectiveStatement = objectiveStatement;
      });
      this.projectSub = this.projectService.getProjectUpdateListener()
      .subscribe((project: Project[]) => {
        this.projectList = project;
      });
      this.skillSub = this.skillService.getSkillUpdateListener()
      .subscribe((skills: Skill[]) => {
        this.skillList = skills;
      });
  }

  onDeleteAward(awardId: string) {
    this.awardsService.deleteAward(awardId);
  }
  onDeleteEducation(educationId: string) {
    this.educationService.deleteEducation(educationId);
  }
  onDeleteExperience(experienceId: string) {
    this.experienceService.deleteExperience(experienceId);
  }
  onDeleteProject(projectId: string) {
    this.projectService.deleteProject(projectId);
  }
  onDeleteSkill(skillId: string) {
    this.skillService.deleteSkill(skillId);
  }
  ngOnDestroy() {
    this.awardsSub.unsubscribe();
    this.contactInfoSub.unsubscribe();
    this.educationSub.unsubscribe();
    this.experienceSub.unsubscribe();
    this.objectiveStatementSub.unsubscribe();
    this.projectSub.unsubscribe();
    this.skillSub.unsubscribe();
  }
  getContactInfoObject() {
    return {...this.contactInfo};
}
}
