import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Award } from '../award.model';
import { AwardsService } from '../awards.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component ({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})

export class AwardListComponent implements OnInit, OnDestroy {
  awardList: Award[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  private awardsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public awardsService: AwardsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.awardsService.getAwards();
    this.awardsSub = this.awardsService.getAwardUpdateListener()
      .subscribe((awards: Award[]) => {
        this.isLoading = false;
        this.awardList = awards;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe( isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onDelete(awardId: string) {
    this.awardsService.deleteAward(awardId);
  }
  ngOnDestroy() {
    this.awardsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
