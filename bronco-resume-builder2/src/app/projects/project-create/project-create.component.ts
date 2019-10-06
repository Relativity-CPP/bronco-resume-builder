import { Component, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/projects/project';

@Component ({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})

export class ProjectCreateComponent {
  enteredTitle = '';
  enteredStartDate = new Date();
  enteredEndDate = new Date();
  enteredDescription = '';

  @Output() projectCreated = new EventEmitter<Project>();

  onAddProject() {
    const project: Project = {
      title: this.enteredTitle,
      startDate: this.enteredStartDate,
      endDate: this.enteredEndDate,
      description: this.enteredDescription
    };
    this.projectCreated.emit(project);
  }
}
