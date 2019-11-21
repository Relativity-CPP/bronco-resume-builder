import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  invalidLogin = false;
  userIsAuthenticated = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.invalidLogin = false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.router.navigate(['/resume']);
    } else {
      this.isLoading = false;
      this.router.navigate(['/login']);
    }
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (!this.authService.login(form.value.email, form.value.password)) {
      this.isLoading = false;
      this.invalidLogin = true;
    }
  }
}
