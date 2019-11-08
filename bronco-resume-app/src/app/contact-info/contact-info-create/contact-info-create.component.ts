import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactInfo } from 'src/app/contact-info/contact-info.model';
import { ContactInfoService } from '../contact-info.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component ({
  selector: 'app-contact-info-create',
  templateUrl: './contact-info-create.component.html',
  styleUrls: ['./contact-info-create.component.css']
})

export class ContactInfoCreateComponent implements OnInit {

  private mode = 'create';
  contactInfo: ContactInfo;
  private contactId: string;
  isLoading = false;

  constructor(public contactInfoService: ContactInfoService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('contactId')) {
        this.mode = 'edit';
        this.contactId = paramMap.get('contactId');
        this.isLoading = true;
        this.contactInfo = this.contactInfoService.getContactInfoClone();
      } else {
        this.mode = 'create';
        this.contactId = null;
      }
    });
  }

  onSaveContactInfo(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const contactInfo: ContactInfo = {
      id: null,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      homeAddress: form.value.homeAddress,
      phoneNumber: form.value.phoneNumber,
      emailAddress: form.value.emailAddress,
      socialMediaLink: form.value.socialMediaLink
    };
    this.contactInfoService.addContactInfo(contactInfo);
  }
}
