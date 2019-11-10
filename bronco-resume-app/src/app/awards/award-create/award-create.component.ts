import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Award } from '../award.model';
import { AwardsService } from '../awards.service';
import { ContactInfo } from 'src/app/contact-info/contact-info.model';
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
  constructor(public awardsService: AwardsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('awardId')) {
        this.mode = 'edit';
        this.awardId = paramMap.get('awardId');
        this.award = this.awardsService.getAward(this.awardId);
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
    if (this.mode === 'create') {
      const dateEarned = this.awardsService.transformDate(form.value.date);
      const award: Award = {
        id: '',
        title: form.value.title,
        date: dateEarned,
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
