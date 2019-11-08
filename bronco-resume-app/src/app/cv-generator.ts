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




// //const awardsService: AwardsService = resumeInfoComponent.awardsService;
// const contactInfoService: ContactInfoService;
// const educationService: EducationService;
// const experienceService: ExperienceService;
// const objectiveStatementService: ObjectiveStatementService;
// const projectService: ProjectService;
// const skillService: SkillService;
//
// const resumeInfoComponent = new ResumeInfoComponent(this.awards, contactInfoS, educationService,
//   experienceService, objectiveStatementService, projectService, skillService );
// const awardsService: AwardsService = resumeInfoComponent.awardsService;


const FIRSTNAMEs = 'j';
const LASTNAME  = 'LN' ;
const PHONE_NUMBER = '07534563401';
const PROFILE_URL = 'https://www.linkedin.com/in/dolan1';
const EMAIL = 'docx@docx.com';
const ADDRESS = '123 sesame st' ;

export class DocumentCreator {
   constructor( public awardsService: AwardsService, public contactInfoService: ContactInfoService,
                public educationService: EducationService, public experienceService: ExperienceService,
                public objectiveStatementService: ObjectiveStatementService, public projectService: ProjectService,
                public skillService: SkillService ) {}
  // const awardList: Award[] = [];
 contactInfo: ContactInfo;
// const educationList: Education[] = [];
// const experienceList: Experience[] = [];
 objectiveStatement: ObjectiveStatement;
// const projectList: Project[] = [];
// const skillList: Skill[] = [];
create(data) {
    const experiences = data[0];
    const educations = data[1];
    const skills = data[2];
    const achievements = data[3];
    const document = new Document();
    this.contactInfo = this.contactInfoService.getContactInfoClone();
    this.objectiveStatement = this.objectiveStatementService.getObjectiveClone();
    //
    document.addParagraph(new Paragraph(this.contactInfo.firstName + ' ' + this.contactInfo.lastName).title());
    document.addParagraph(this.createContactInfo(this.contactInfo.phoneNumber, this.contactInfo.socialMediaLink,
      this.contactInfo.emailAddress, this.contactInfo.homeAddress));
    document.addParagraph(this.createObjectiveStatement(this.objectiveStatement.statement));
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
}

