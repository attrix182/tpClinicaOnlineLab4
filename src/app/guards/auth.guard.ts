import { AuthService } from './../servicios/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) {

  }


  canActivate(): Observable<boolean> {

    return this.authSvc.AFauth.authState.pipe(
      map(user => {
        if (!user) {

          this.router.navigate(['/login']);

          return false;
        }
        return true;
      })
    );

  }

}