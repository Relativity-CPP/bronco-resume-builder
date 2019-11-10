import { Component } from '@angular/core';
import { Packer } from 'docx';
import { saveAs } from 'file-saver/FileSaver';
import {DocumentCreator} from './cv-generator';
import { experiences, education, skills, achievements } from './cv-data';
import {AwardsService} from './awards/awards.service';
import {ContactInfoService} from './contact-info/contact-info.service';
import {EducationService} from './education/education.service';
import {ExperienceService} from './experience/experience.service';
import {ObjectiveStatementService} from './objective/objectveStatement.service';
import {ProjectService} from './projects/project.service';
import {SkillService} from './skills/skill.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public awardsService: AwardsService, public contactInfoService: ContactInfoService,
               public educationService: EducationService, public experienceService: ExperienceService,
               public objectiveStatementService: ObjectiveStatementService, public projectService: ProjectService,
               public skillService: SkillService ) {}
  public download(): void {
    const documentCreator = new DocumentCreator(this.awardsService, this.contactInfoService, this.educationService,
      this.experienceService, this.objectiveStatementService, this.projectService, this.skillService); // pass in in order
    const doc = documentCreator.create();

    const packer = new Packer();
    packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, 'myresume.docx');
      console.log('Document created successfully');
    });
  }
}
