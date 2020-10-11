import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Skill } from '../skill.model';
import { SkillService } from '../skill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent {
  skillList: Skill[] = [];
  constructor(public skillService: SkillService, public router: Router) {}

  onAddSkill(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const skill: Skill = {
      id: '',
      description: form.value.description
    };
    this.skillService.addSkill(skill);
    form.resetForm();
    this.router.navigate(['/skills']);
  }
}
