import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { ContactInfo } from './contact-info.model';

@Injectable({providedIn: 'root'})
export class ContactInfoService {
    private contactInfo: ContactInfo = {
      id: null,
      firstName: '',
      lastName: '',
      homeAddress: '',
      phoneNumber: '',
      emailAddress: '',
      socialMediaLink: ''
    };
    private contactInfoUpdated = new Subject<ContactInfo>();

    constructor(private http: HttpClient) {}

    getContactInfo() {
      this.http.get<{message: string, contactInfo: ContactInfo}>('http://localhost:3000/api/contact-info')
        .subscribe((contactInfoData) => {
          console.log(contactInfoData.message);
          this.contactInfo = contactInfoData.contactInfo;
          this.contactInfoUpdated.next(Object.create(this.contactInfo));
        });
    }

    addContactInfo(contactInfo: ContactInfo) {
        this.contactInfo = {
            id: null,
            firstName: contactInfo.firstName,
            lastName: contactInfo.lastName,
            homeAddress: contactInfo.homeAddress,
            phoneNumber: contactInfo.phoneNumber,
            emailAddress: contactInfo.emailAddress,
            socialMediaLink: contactInfo.socialMediaLink
        };
        this.http.post<{message: string}>('http://localhost:3000/api/contact-info', contactInfo)
          .subscribe((responseData) => {
              console.log(responseData.message);
              this.contactInfoUpdated.next(Object.create(this.contactInfo));
          });
    }

    getContactInfoUpdateListener() {
      return this.contactInfoUpdated.asObservable();
    }
}
