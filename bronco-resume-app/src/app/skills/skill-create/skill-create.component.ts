import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Skill } from '../skill.model';
import { SkillsService } from '../skill.service';

@Component ({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent {

  constructor(public skillsService: SkillsService) {}

  onAddSkill(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const skill: Skill = {
      description: form.value.description,
    };
    this.skillsService.addSkill(skill);
    form.resetForm();
  }
}
