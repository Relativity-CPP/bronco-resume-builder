import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Education } from 'src/app/education/education.model';
import { EducationService } from '../education.service';

@Component ({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css']
})

export class EducationListComponent implements OnInit, OnDestroy{
  educationList: Education[] = [];
  private educationSub: Subscription;

  constructor(public educationService: EducationService) {}

  ngOnInit() {
    this.educationList = this.educationService.getEducation();
    this.educationSub = this.educationService.getEducationUpdateListener()
      .subscribe((education: Education[]) => {
        this.educationList = education;
      });
  }
  ngOnDestroy() {
    this.educationSub.unsubscribe();
  }
}
