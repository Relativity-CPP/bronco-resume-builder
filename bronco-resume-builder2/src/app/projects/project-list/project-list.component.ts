import { Component, Input } from '@angular/core';
import { Project } from 'src/app/projects/project';

@Component ({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent {
  @Input() projectList: Project[] = [];
}
