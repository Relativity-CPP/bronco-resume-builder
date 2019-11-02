import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Skill } from '../skill.model';
import { SkillService } from '../skill.service';

@Component ({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent {

  constructor(public skillService: SkillService) {}

  onAddSkill(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const skill: Skill = {
      id: '',
      description: form.value.description,
    };
    this.skillService.addSkill(skill);
    form.resetForm();
  }
}
