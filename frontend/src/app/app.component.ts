import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-buttons-basic',
  templateUrl: './basic.html',
})
export class DemoButtonsBasic {

  selected = true;
  iconType = 'border';
  sizes: string[] = ['x-small', 'small', 'large'];

  change() {
    this.selected = !this.selected;
    this.iconType = this.iconType === 'border' ? 'container' : 'border';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  active: any;
  sections: any;
  hasError: any;
  required: any;
  disabled: any;
  error: any;
}
