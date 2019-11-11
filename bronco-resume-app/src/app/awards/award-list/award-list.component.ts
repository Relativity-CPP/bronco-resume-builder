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
  isLoading = false;
  private awardsSub: Subscription;
  constructor(public awardsService: AwardsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.awardsService.getAwards();
    this.awardsSub = this.awardsService.getAwardUpdateListener()
      .subscribe((awards: Award[]) => {
        this.isLoading = false;
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
