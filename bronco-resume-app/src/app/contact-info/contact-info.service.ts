import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ContactInfo } from './contact-info.model';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/contact-info';

@Injectable({providedIn: 'root'})
export class ContactInfoService {
    private contactInfo: ContactInfo = null;
    private contactInfoUpdated = new Subject<ContactInfo>();

  constructor(private http: HttpClient, private router: Router) {}

  getContactInfo() {
    this.http
      .get<{message: string, contactInfo: any}>(
        BACKEND_URL
        )
      .pipe(map((contactInfoData) => {
        return contactInfoData.contactInfo.map(contact => {
          return {
          firstName: contact.firstName,
          lastName:  contact.lastName,
          phoneNumber: contact.phoneNumber,
          homeAddress: contact.homeAddress,
          emailAddress: contact.emailAddress,
          socialMediaLink: contact.socialMediaLink,
          id: contact._id,
          creator: contact.creator
        };
      });
    }))
    .subscribe((transformedContactInfo) => {
      if (transformedContactInfo.length > 0) {
        this.contactInfo = transformedContactInfo[0];
        this.contactInfoUpdated.next(Object.create(this.contactInfo));
      }
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
    this.http.post<{message: string; contactId: string}>(BACKEND_URL , contactInfo)
      .subscribe((responseData) => {
        console.log(responseData);
        const id = responseData.contactId;
        contactInfo.id = id;
        this.contactInfoUpdated.next(Object.create(this.contactInfo));
        this.router.navigate(['/contact']);
    });
  }
  updateContactInfo(id: string, contact: ContactInfo) {
    this.http.put(BACKEND_URL + '/' + id, contact)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/contact']);
    });
  }
  getContactInfoUpdateListener() {
    return this.contactInfoUpdated.asObservable();
  }
  getContactInfoClone() {
    return {...this.contactInfo};
  }
}
