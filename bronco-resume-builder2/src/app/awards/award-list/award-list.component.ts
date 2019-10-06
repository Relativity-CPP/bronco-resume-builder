import { Component, Input } from '@angular/core';
import { Award } from 'src/app/awards/award';

@Component ({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})

export class AwardListComponent {
  @Input() awardList: Award[] = [];
}
