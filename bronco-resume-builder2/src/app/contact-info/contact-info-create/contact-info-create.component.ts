import { Component, EventEmitter, Output } from '@angular/core';
import { ContactInfo } from 'src/app/contact-info/contact-info';

@Component ({
  selector: 'app-contact-info-create',
  templateUrl: './contact-info-create.component.html',
  styleUrls: ['./contact-info-create.component.css']
})
export class ContactInfoCreateComponent {
  enteredFName = '';
  enteredLName = '';
  enteredAddress = '';
  enteredPhoneNumber = '';
  enteredEmail = '';
  enteredSocialLink = '';

  @Output() contactInfoCreated = new EventEmitter<ContactInfo>();

  onAddContactInfo() {
    const contactInfo: ContactInfo = {
      firstName: this.enteredFName,
      lastName: this.enteredLName,
      homeAddress: this.enteredAddress,
      phoneNumber: this.enteredPhoneNumber,
      emailAddress: this.enteredEmail,
      socialMediaLink: this.enteredSocialLink,
    };
    this.contactInfoCreated.emit(contactInfo);
  }
}
