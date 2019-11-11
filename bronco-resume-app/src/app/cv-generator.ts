import { Document, Paragraph, Packer, TextRun } from 'docx';
import {ResumeInfoComponent} from './resume-info/resume-info/resume-info.component';
import { ContactInfo } from 'src/app/contact-info/contact-info.model';
import {Award} from './awards/award.model';
import {Education} from './education/education.model';
import {Experience} from './experience/experience.model';
import {ObjectiveStatement} from './objective/objectiveStatement.model';
import {Project} from './projects/project.model';
import {Skill} from './skills/skill.model';
import {AwardsService} from './awards/awards.service';
import {ContactInfoService} from './contact-info/contact-info.service';
import {EducationService} from './education/education.service';
import {ExperienceService} from './experience/experience.service';
import {ObjectiveStatementService} from './objective/objectveStatement.service';
import {ProjectService} from './projects/project.service';
import {SkillService} from './skills/skill.service';

export class DocumentCreator {
   constructor( public awardsService: AwardsService, public contactInfoService: ContactInfoService,
                public educationService: EducationService, public experienceService: ExperienceService,
                public objectiveStatementService: ObjectiveStatementService, public projectService: ProjectService,
                public skillService: SkillService ) {}

 awardList: Award[] = [];
 contactInfo: ContactInfo;
 educationList: Education[] = [];
 experienceList: Experience[] = [];
 objectiveStatement: ObjectiveStatement;
 projectList: Project[] = [];
 skillList: Skill[] = [];
create() {
    const document = new Document();
    // setting local objects equal to those in the database
    this.contactInfo = this.contactInfoService.getContactInfoClone();
    this.objectiveStatement = this.objectiveStatementService.getObjectiveClone();
    this.educationList = this.educationService.getEducationListClone();
    this.experienceList = this.experienceService.getExperienceListClone();
    this.skillList = this.skillService.getSkillListClone();
    this.projectList = this.projectService.getProjectListClone();
    this.awardList = this.awardsService.getAwardsListClone();
    //
    document.addParagraph(new Paragraph(this.contactInfo.firstName + ' ' + this.contactInfo.lastName).title());
    document.addParagraph(this.createContactInfo(this.contactInfo.phoneNumber, this.contactInfo.socialMediaLink,
      this.contactInfo.emailAddress, this.contactInfo.homeAddress));
    document.addParagraph(this.createObjectiveStatement(this.objectiveStatement.statement));
    document.addParagraph(this.createHeading('Education'));
    // for loop to display education
    for (let i of Object.keys(this.educationList) ) {
      document.addParagraph(
        this.createSchoolHeader(this.educationList[i].schoolName,
          this.educationList[i].schoolStartDate + ' - ' + this.educationList[i].schoolEndDate)
      );
      document.addParagraph(this.createRoleText(this.educationList[i].major + ' - ' +
        this.educationList[i].degreeType + ' Graduated with ' +
      this.educationList[i].gpa + ' G.P.A'));
    }
    document.addParagraph(this.createHeading('Experience'));
    for (let i of Object.keys(this.experienceList) ) {
      document.addParagraph(
       this.createSchoolHeader(this.experienceList[i].companyName,
        this.experienceList[i].jobStartDate + '-' + this.experienceList[i].jobEndDate)
      );
      document.addParagraph(this.createRoleText(this.experienceList[i].jobTitle));
      document.addParagraph(this.createBullet(this.experienceList[i].description));
    }
  document.addParagraph(this.createHeading('Skills'));
  //   for (let i of Object.keys(this.skillList) ) {
  //   document.addParagraph(this.createSkillHeader(this.skillList[i].description));
  // }
  document.addParagraph(this.createHeading('Projects'));
    for (let i of Object.keys(this.projectList) ) {
    document.addParagraph(this.createSchoolHeader(this.projectList[i].title,
      this.projectList[i].startDate + '-' + this.projectList[i].endDate)
    );
    document.addParagraph(this.createBullet(this.projectList[i].description));
  }
  document.addParagraph(this.createHeading('Awards'));
    for (let i of Object.keys(this.awardList) ) {
    document.addParagraph(this.createSchoolHeader(this.awardList[i].title,
      this.awardList[i].date)
    );
    document.addParagraph(this.createBullet(this.awardList[i].description));
  }
    // end education for loop
    return document;
  }
  private createContactInfo(phoneNumber: string, profileUrl: string, email: string, address: string) {
    const paragraph = new Paragraph().center();
    const contactInfoLine = new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`);
    const addressTextLine = new TextRun('Address: ' + address).break();

    paragraph.addRun(contactInfoLine);
    paragraph.addRun(addressTextLine);

    return paragraph;
  }
  private createObjectiveStatement(objectiveStatement: string) {
  const paragraph = new Paragraph().center();
  const objectiveStatementLine = new TextRun('Objective Statement: ' + objectiveStatement);
  paragraph.addRun(objectiveStatementLine);
  return paragraph;
  }

  createHeading(text) {
    return new Paragraph(text)
      .heading1().thematicBreak();
  }
  createSubHeading(text) {
  return new Paragraph(text).heading2();
  }

  createSchoolHeader(schoolname, datetext) {
  const paragraph = new Paragraph()
    .maxRightTabStop();
  const school = new TextRun
  (schoolname).bold();
  const date = new TextRun(datetext).tab().bold();
  paragraph.addRun(school);
  paragraph.addRun(date);
  return paragraph;
  }

  createRoleText(roleText) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).italic();

    paragraph.addRun(role);

    return paragraph;
  }
  createBullet(text) {
    return new Paragraph(text).bullet();
  }
  // createSkillList (skills) {
  //   const paragraph = new Paragraph();
  //   const skillConcat = skills.map((this.skillList) => this.skillList.description).join(', ') + '.';
  //   paragraph.addRun(new TextRun(skillConcat));
  //   return paragraph;
  // }
  //attempted my own thing here
  // createSkillHeader(skills) {
  //   const paragraph = new Paragraph()
  //   const skill = new TextRun(skills);
  //   paragraph.addRun(skill + ', ');
  //   return paragraph;
  // }
  // move the download function to the resume-info as a new component
}

