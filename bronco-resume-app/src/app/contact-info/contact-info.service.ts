import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ContactInfo } from './contact-info.model';
import { Socket } from 'net';

@Injectable({providedIn: 'root'})
export class ContactInfoService {
    private contactInfo: ContactInfo = {
      firstName: '',
      lastName: '',
      homeAddress: '',
      emailAddress: '',
      phoneNumber: '',
      socialMediaLink: '',
      id: ''
    }
    private contactInfoUpdated = new Subject<ContactInfo>();

    constructor(private http: HttpClient, private router: Router) {}

    getContactInfo() {
    this.http
      .get<{message: string, contactInfo: any}>(
        'http://localhost:3000/api/contact-info'
      )
      .subscribe((contactInfoData) => {
        this.contactInfo.firstName = contactInfoData.contactInfo.firstName;
        this.contactInfo.lastName = contactInfoData.contactInfo.lastName;
        this.contactInfo.phoneNumber = contactInfoData.contactInfo.phoneNumber;
        this.contactInfo.homeAddress = contactInfoData.contactInfo.homeAddress;
        this.contactInfo.emailAddress = contactInfoData.contactInfo.emailAddress;
        this.contactInfo.socialMediaLink = contactInfoData.contactInfo.socialMediaLink;
        this.contactInfo.id = contactInfoData.contactInfo._id;
        console.log(this.contactInfo);
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
        this.http.post<{message: string; contactId: string}>('http://localhost:3000/api/contact-info', contactInfo)
          .subscribe((responseData) => {
              console.log(responseData.message);
              const id = responseData.contactId;
              contactInfo.id = id;
              this.contactInfoUpdated.next(Object.create(this.contactInfo));
              this.router.navigate(['/']);
          });
    }
    updateContactInfo(id: string, contact: ContactInfo) {
      console.log(contact);
      this.http.put('http://localhost:3000/api/contact-info/' + id, contact)
        .subscribe(response => console.log(response));
    }
    getContactInfoUpdateListener() {
      return this.contactInfoUpdated.asObservable();
    }
    getContactInfoClone() {
      return {...this.contactInfo};
    }
}
