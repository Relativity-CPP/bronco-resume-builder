import { Document, Paragraph, Packer, TextRun } from "docx";
import { ContactInfo } from "src/app/contact-info/contact-info.model";
import { Award } from "./awards/award.model";
import { Education } from "./education/education.model";
import { Experience } from "./experience/experience.model";
import { ObjectiveStatement } from "./objective/objectiveStatement.model";
import { Project } from "./projects/project.model";
import { Skill } from "./skills/skill.model";
import { AwardsService } from "./awards/awards.service";
import { ContactInfoService } from "./contact-info/contact-info.service";
import { EducationService } from "./education/education.service";
import { ExperienceService } from "./experience/experience.service";
import { ObjectiveStatementService } from "./objective/objectveStatement.service";
import { ProjectService } from "./projects/project.service";
import { SkillService } from "./skills/skill.service";

export class DocumentCreator {
  constructor(
    public awardsService: AwardsService,
    public contactInfoService: ContactInfoService,
    public educationService: EducationService,
    public experienceService: ExperienceService,
    public objectiveStatementService: ObjectiveStatementService,
    public projectService: ProjectService,
    public skillService: SkillService
  ) {}

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
    // Contact Info
    document.addParagraph(
      new Paragraph(
        this.contactInfo.firstName + " " + this.contactInfo.lastName
      )
        .title()
        .center()
    );
    document.addParagraph(
      this.createContactInfo(
        this.contactInfo.phoneNumber,
        this.contactInfo.socialMediaLink,
        this.contactInfo.emailAddress,
        this.contactInfo.homeAddress
      )
    );
    if (this.objectiveStatement.statement) {
      document.addParagraph(
        this.createObjectiveStatement(this.objectiveStatement.statement)
      );
    }
    // Education History
    if (Object.keys(this.educationList).length > 0) {
      document.addParagraph(this.createHeading("Education"));
      // for loop to display education
      for (const i of Object.keys(this.educationList)) {
        document.addParagraph(
          this.createSchoolHeader(
            this.educationList[i].schoolName,
            this.createPositionDateText(
              this.educationList[i].schoolStartDate,
              this.educationList[i].schoolEndDate
            )
          )
        );
        document.addParagraph(
          this.createHeader(
            this.educationList[i].major +
              " - " +
              this.educationList[i].degreeType,
            "GPA: " + this.educationList[i].gpa
          )
        );
      }
    }

    // Experience History
    if (Object.keys(this.experienceList).length > 0) {
      document.addParagraph(this.createHeading("Experience"));
      for (let i of Object.keys(this.experienceList)) {
        document.addParagraph(
          this.createSchoolHeader(
            this.experienceList[i].companyName,
            this.createPositionDateText(
              this.experienceList[i].jobStartDate,
              this.experienceList[i].jobEndDate
            )
          )
        );
        document.addParagraph(
          this.createRoleText(this.experienceList[i].jobTitle)
        );
        const bulletPoints = this.splitParagraphIntoBullets(
          this.experienceList[i].description
        );
        bulletPoints.forEach(bulletPoint => {
          if (bulletPoint.length > 1) {
            document.addParagraph(this.createBullet(bulletPoint));
          }
        });
      }
    }

    // Skills Section
    if (Object.keys(this.skillList).length > 0) {
      document.addParagraph(this.createHeading("Skills"));
      document.addParagraph(this.skillHeader());
    }

    // Project Section
    if (Object.keys(this.projectList).length > 0) {
      document.addParagraph(this.createHeading("Projects"));
      for (let i of Object.keys(this.projectList)) {
        document.addParagraph(
          this.createSchoolHeader(
            this.projectList[i].title,
            this.createPositionDateText(
              this.projectList[i].startDate,
              this.projectList[i].endDate
            )
          )
        );
        const bulletPoints = this.splitParagraphIntoBullets(
          this.projectList[i].description
        );
        bulletPoints.forEach(bulletPoint => {
          if (bulletPoint.length > 1) {
            document.addParagraph(this.createBullet(bulletPoint));
          }
        });
      }
    }

    // Awards
    if (Object.keys(this.awardList).length > 0) {
      document.addParagraph(this.createHeading("Awards"));
      for (let i of Object.keys(this.awardList)) {
        document.addParagraph(
          this.createSchoolHeader(
            this.awardList[i].title,
            this.getMonthFromInt(
              Number(this.awardList[i].date.substring(5, 7))
            ) +
              ". " +
              this.awardList[i].date.substring(0, 4)
          )
        );
        const bulletPoints = this.splitParagraphIntoBullets(
          this.awardList[i].description
        );
        bulletPoints.forEach(bulletPoint => {
          if (bulletPoint.length > 1) {
            document.addParagraph(this.createBullet(bulletPoint));
          }
        });
      }
    }

    // end education for loop
    return document;
  }
  private createContactInfo(
    phoneNumber: string,
    profileUrl: string,
    email: string,
    address: string
  ) {
    const paragraph = new Paragraph().center();
    const contactInfoLine = new TextRun(
      `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
    );
    const addressTextLine = new TextRun("Address: " + address).break();

    paragraph.addRun(contactInfoLine);
    paragraph.addRun(addressTextLine);

    return paragraph;
  }
  private createObjectiveStatement(objectiveStatement: string) {
    const paragraph = new Paragraph().center();
    const objectiveStatementLine = new TextRun(
      "Objective Statement: " + objectiveStatement
    );
    paragraph.addRun(objectiveStatementLine);
    return paragraph;
  }

  createHeading(text) {
    return new Paragraph(text).heading1().thematicBreak();
  }
  createSubHeading(text) {
    return new Paragraph(text).heading2();
  }

  createSchoolHeader(schoolname, datetext) {
    const paragraph = new Paragraph().maxRightTabStop();
    const school = new TextRun(schoolname).bold();
    const date = new TextRun(datetext).tab().bold();
    paragraph.addRun(school);
    paragraph.addRun(date);
    return paragraph;
  }
  createHeader(first, last) {
    const paragraph = new Paragraph().maxRightTabStop();
    const a = new TextRun(first);
    const b = new TextRun(last).tab();
    paragraph.addRun(a);
    paragraph.addRun(b);
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

  skillHeader() {
    const paragraph = new Paragraph();
    const comma = new TextRun(", ");
    let j = 0;
    for (const i of Object.keys(this.skillList)) {
      const skill = new TextRun(this.skillList[i].description);
      paragraph.addRun(skill);
      j = j + 1;
      // tslint:disable-next-line:triple-equals
      if (Object.keys(this.skillList).length == j) {
        break;
      }
      paragraph.addRun(comma);
    }
    const end = new TextRun(".");
    paragraph.addRun(end);
    return paragraph;
  }
  splitParagraphIntoBullets(text) {
    return text.split("\n");
  }
  createPositionDateText(startDate, endDate) {
    const startDateText =
      this.getMonthFromInt(Number(startDate.substring(5, 7))) +
      ". " +
      startDate.substring(0, 4);
    const endDateText = `${this.getMonthFromInt(
      Number(endDate.substring(5, 7))
    )}. ${endDate.substring(0, 4)}`;
    return `${startDateText} - ${endDateText}`;
  }
  getMonthFromInt(value) {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }
}
