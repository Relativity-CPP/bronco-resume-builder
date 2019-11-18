import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {
  isLoading = false;
  accountExists = false;
  constructor(public authService: AuthService, private router: Router) {}
  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.accountExists = !this.authService.createUser(
      form.value.email,
      form.value.password
    );
  }
}
