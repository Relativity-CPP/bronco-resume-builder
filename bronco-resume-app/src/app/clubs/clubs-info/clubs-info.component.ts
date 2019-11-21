import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  description: string;
  weblink: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'CSS',
    description:
      'Encourage the development of software engineering skills in students',
    weblink: 'https://cppcss.club'
  },
  // tslint:disable-next-line:max-line-length
  {
    name: 'She Code',
    description:
      'Work to promoteand support the growing community of women, including allies, in computer science and technology',
    weblink: 'https://www.cpp.edu/~shecodes/'
  },
  // tslint:disable-next-line:max-line-length
  {
    name: 'Software Engineering Association',
    description:
      'Teaches and encourages the professional skills needed to be a Software Engineer',
    weblink: 'https://www.cppsea.com'
  },
  // tslint:disable-next-line:max-line-length
  {
    name: 'Swift',
    description:
      'Dynamic landscape of information security, cyber security, and information technology',
    weblink: 'https://www.calpolyswift.org'
  },
  {
    name: 'Game Design and Development',
    description:
      'Promote and educate students about the world of game design and development',
    weblink: 'https://www.cppgamedev.com'
  },
  // tslint:disable-next-line:max-line-length
  {
    name: 'Fast',
    description:
      'Study Digital Forensics, Cyber Crime, and Cyber Security by working with government agencies, and private firms',
    weblink: 'https://www.cppfast.org'
  }
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-clubs-info',
  templateUrl: './clubs-info.component.html',
  styleUrls: ['./clubs-info.component.css']
})
export class ClubsInfoComponent {
  displayedColumns: string[] = ['name', 'description'];
  dataSource = ELEMENT_DATA;
}
