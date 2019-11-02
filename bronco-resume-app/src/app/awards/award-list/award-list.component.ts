import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Award } from '../award.model';
import { AwardsService } from '../awards.service';

@Component ({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})

export class AwardListComponent implements OnInit, OnDestroy {
  awardList: Award[] = [];
  private awardsSub: Subscription;

  constructor(public awardsService: AwardsService) {}

  ngOnInit() {
    this.awardsService.getAwards();
    this.awardsSub = this.awardsService.getAwardUpdateListener()
      .subscribe((awards: Award[]) => {
        this.awardList = awards;
      });
  }

  onDelete(awardId: string) {
    this.awardsService.deleteAward(awardId);
  }

  ngOnDestroy() {
    this.awardsSub.unsubscribe();
  }
}
