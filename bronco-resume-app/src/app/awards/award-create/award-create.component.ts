import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Award } from '../award.model';
import { AwardsService } from '../awards.service';

@Component ({
  selector: 'app-award-create',
  templateUrl: './award-create.component.html',
  styleUrls: ['./award-create.component.css']
})
export class AwardCreateComponent {

  constructor(public awardsService: AwardsService) {}

  onAddAward(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const award: Award = {
      title: form.value.title,
      date: form.value.date,
      description: form.value.description
    };
    this.awardsService.addAward(award);
    form.resetForm();
  }
}
