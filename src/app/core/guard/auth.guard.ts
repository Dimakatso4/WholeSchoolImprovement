import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { Router } from '@angular/router';
import { Roles } from 'src/app/model/role';
import { AuthService } from 'src/app/views/pages/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService : AuthService) {}

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      const allowedUserRoles = route.data.userRoles;
      // console.log('roles' + route.data.userRoles);
      return await this.checkPermission(allowedUserRoles);

  }

  public async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const allowedUserRoles = route.data.userRoles;
    console.log('roles' + route.data.userRoles);
    return await this.checkPermission(allowedUserRoles);

}

  private checkPermission(allowedUserRoles: Roles[]): Promise<boolean> {
    return this.authService.getSession().then((session: boolean) => {
      if (session) {
        if (!allowedUserRoles) {
          return true;   // if no user roles has been set, all user are allowed to access the route
        } else {
          return this.authService.getUserRoles().then((userRoles: string[]) => {
            if (this.authService.areUserRolesAllowed(userRoles, allowedUserRoles)) {
              return true;
            } else {

              //this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
              this.router.navigateByUrl('/auth/login');
              return false;
            }
          });
        }
      } else { 
        this.router.navigateByUrl('/auth/login');
        return false; 
      }
    });
  }
}