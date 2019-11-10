import {
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot): boolean |
    import('@angular/router').UrlTree |
    import('rxjs').Observable<boolean |
    import('@angular/router').UrlTree> |
    Promise<boolean |
    import('@angular/router').UrlTree> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      console.log('here');
      this.router.navigate(['/login']);
    }
    console.log('here');
    return isAuth;
  }
}
