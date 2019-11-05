import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactInfo } from 'src/app/contact-info/contact-info.model';
import { ContactInfoService } from '../contact-info.service';

@Component ({
  selector: 'app-contact-info-create',
  templateUrl: './contact-info-create.component.html',
  styleUrls: ['./contact-info-create.component.css']
})

export class ContactInfoCreateComponent {

  constructor(public contactInfoService: ContactInfoService) {}

  onAddContactInfo(form: NgForm) {
    if (form.invalid) {
      return;
    }
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
