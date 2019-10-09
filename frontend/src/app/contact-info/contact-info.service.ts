import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ContactInfo } from './contact-info.model';

@Injectable({providedIn: 'root'})
export class ContactInfoService {
    private contactInfo: ContactInfo = null;
    private contactInfoUpdated = new Subject<ContactInfo>();

    getContactInfo() {
        return Object.create(this.contactInfo);
    }

    addContactInfo(contactInfo: ContactInfo) {
        this.contactInfo = {
            firstName: contactInfo.firstName,
            lastName: contactInfo.lastName,
            homeAddress: contactInfo.homeAddress,
            phoneNumber: contactInfo.phoneNumber,
            emailAddress: contactInfo.emailAddress,
            socialMediaLink: contactInfo.socialMediaLink
        };
        this.contactInfoUpdated.next(Object.create(this.contactInfo));
    }

    getContactInfoUpdateListener() {
        return this.contactInfoUpdated.asObservable();
    }
}
