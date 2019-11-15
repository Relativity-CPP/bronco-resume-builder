import { Component } from "@angular/core";

export interface PeriodicElement {
  name: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: "CSS",
    description:
      "Encourage the development of software engineering skills in students"
  },
  // tslint:disable-next-line:max-line-length
  {
    name: "She Code",
    description:
      "Work to promote and support the growing community of women, including allies, in computer science and technology"
  },
  // tslint:disable-next-line:max-line-length
  {
    name: "Software Engineering Association",
    description:
      "Teaches and encourages the professional skills needed to be a Software Engineer"
  },
  // tslint:disable-next-line:max-line-length
  {
    name: "Swift",
    description:
      "Dynamic landscape of information security, cyber security, and information technology"
  },
  {
    name: "Game Dev",
    description:
      "Promote and educate students about the world of game design and development"
  },
  // tslint:disable-next-line:max-line-length
  {
    name: "Fast",
    description:
      "Study Digital Forensics, Cyber Crime, and Cyber Security by working with government agencies, and private firms"
  }
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: "app-clubs-info",
  templateUrl: "./clubs-info.component.html",
  styleUrls: ["./clubs-info.component.css"]
})
export class ClubsInfoComponent {
  displayedColumns: string[] = ["name", "description"];
  dataSource = ELEMENT_DATA;
}
