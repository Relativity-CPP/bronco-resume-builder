import { Component, Output, EventEmitter } from '@angular/core';
import { Award } from 'src/app/awards/award';

@Component ({
  selector: 'app-award-create',
  templateUrl: './award-create.component.html'
})
export class AwardCreateComponent {
  enteredTitle = '';
  enteredDate = new Date();
  enteredDescription = '';

  @Output() awardCreated = new EventEmitter<Award>();

  onAddAward() {
    const award: Award = {
      title: this.enteredTitle,
      date: this.enteredDate,
      description: this.enteredDescription
    };
    this.awardCreated.emit(award);
  }
}
