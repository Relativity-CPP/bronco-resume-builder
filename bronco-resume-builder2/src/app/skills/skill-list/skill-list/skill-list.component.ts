import { Component, Input } from '@angular/core';
import { Skill } from 'src/app/skills/skill';

@Component ({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})

export class SkillListComponent {
  @Input() skillList: Skill[] = [];
}
