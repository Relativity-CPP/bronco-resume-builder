import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContactInfo } from '../contact-info.model';
import { ContactInfoService } from '../contact-info.service';

@Component ({
  selector: 'app-contact-info-list',
  templateUrl: './contact-info-list.component.html',
  styleUrls: ['./contact-info-list.component.css']
})

export class ContactInfoListComponent implements OnInit, OnDestroy {
  contactInfo: ContactInfo;
  private contactInfoSub: Subscription;

  constructor(public contactInfoService: ContactInfoService) {}

  ngOnInit() {
    this.contactInfoService.getContactInfo();
    this.contactInfoSub = this.contactInfoService.getContactInfoUpdateListener()
      .subscribe((contactInfo: ContactInfo) => {
        this.contactInfo = contactInfo;
      });
  }

  ngOnDestroy() {
    this.contactInfoSub.unsubscribe();
  }
}
