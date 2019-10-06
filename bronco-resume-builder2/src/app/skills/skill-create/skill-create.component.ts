import { Component, Output, EventEmitter } from '@angular/core';
import { Skill } from 'src/app/skills/skill';

@Component ({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})

export class SkillCreateComponent {
  enteredSkill = '';

  @Output() skillCreated = new EventEmitter<Skill>();

  onAddSkill() {
    const skill: Skill = {
      description: this.enteredSkill,
    };
    this.skillCreated.emit(skill);
  }
}
