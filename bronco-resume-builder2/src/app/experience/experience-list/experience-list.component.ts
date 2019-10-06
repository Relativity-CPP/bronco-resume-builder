import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/experience/experience';

@Component ({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})

export class ExperienceListComponent {
  @Input() experienceList: Experience[] = [];
}
