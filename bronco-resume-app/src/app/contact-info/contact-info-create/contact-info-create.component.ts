import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactInfo } from 'src/app/contact-info/contact-info.model';
import { ContactInfoService } from '../contact-info.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contact-info-create',
  templateUrl: './contact-info-create.component.html',
  styleUrls: ['./contact-info-create.component.css']
})
export class ContactInfoCreateComponent implements OnInit {
  contactInfo: ContactInfo = null;
  private mode = 'create';
  private contactId: string;
  isLoading = false;

  constructor(
    public contactInfoService: ContactInfoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('contactId')) {
        this.mode = 'edit';
        this.contactId = paramMap.get('contactId');
        console.log(this.contactId);
        this.isLoading = true;
        this.contactInfo = this.contactInfoService.getContactInfoClone();
        this.isLoading = false;
        console.log(this.contactInfo);
      } else {
        this.mode = 'create';
        this.isLoading = false;
        this.contactId = null;
      }
      this.isLoading = false;
    });
  }

  onSaveContactInfo(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
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
    } else {
      const contactInfo: ContactInfo = {
        id: this.contactId,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        homeAddress: form.value.homeAddress,
        phoneNumber: form.value.phoneNumber,
        emailAddress: form.value.emailAddress,
        socialMediaLink: form.value.socialMediaLink
      };
      this.contactInfoService.updateContactInfo(this.contactId, contactInfo);
    }
    this.isLoading = true;
  }
}
