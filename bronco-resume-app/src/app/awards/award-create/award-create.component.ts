import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Award } from '../award.model';
import { AwardsService } from '../awards.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component ({
  selector: 'app-award-create',
  templateUrl: './award-create.component.html',
  styleUrls: ['./award-create.component.css']
})
export class AwardCreateComponent implements OnInit {
  private mode = 'create';
  private awardId: string;
  award: Award;
  isLoading = false;
  constructor(public awardsService: AwardsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('awardId')) {
        this.mode = 'edit';
        this.awardId = paramMap.get('awardId');
        this.isLoading = true;
        this.awardsService.getAward(this.awardId).subscribe(awardData => {
          this.isLoading = false;
          this.award = {
            id: awardData._id,
            title: awardData.title,
            date: awardData.date,
            description: awardData.description
          };
        });
      } else {
        this.mode = 'create';
        this.awardId = null;
      }
    });
  }

  onSaveAward(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      const award: Award = {
        id: '',
        title: form.value.title,
        date: form.value.date,
        description: form.value.description
      };
      this.awardsService.addAward(award);
    } else {
      console.log('in the right section');
      const award: Award = {
        id: this.awardId,
        title: form.value.title,
        date: form.value.date,
        description: form.value.description
      };
      this.awardsService.updateAward(this.awardId, award);
    }
    form.resetForm();
  }
}
