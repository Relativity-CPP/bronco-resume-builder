import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContactInfo } from '../contact-info.model';
import { ContactInfoService } from '../contact-info.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-contact-info-list',
  templateUrl: './contact-info-list.component.html',
  styleUrls: ['./contact-info-list.component.css']
})
export class ContactInfoListComponent implements OnInit, OnDestroy {
  contactInfo: ContactInfo;
  userIsAuthenticated = false;
  isLoading = false;
  private contactInfoSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public contactInfoService: ContactInfoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = false;
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.contactInfoService.getContactInfo();
    this.contactInfoSub = this.contactInfoService
      .getContactInfoUpdateListener()
      .subscribe((contactInfo: ContactInfo) => {
        this.contactInfo = contactInfo;
        this.isLoading = false;
      });
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.contactInfoSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
