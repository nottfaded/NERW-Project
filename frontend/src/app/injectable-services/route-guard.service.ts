import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AccountService, Role } from "./account.service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

    constructor(private accService: AccountService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot) {
        const requiredRoles = next.data['roles'] as Role[];
        if (requiredRoles && requiredRoles.length > 0 && this.accService && this.accService.role) {
            if (requiredRoles.includes(this.accService.role)) {
                return true;
            } else {
                console.log(next)
                this.router.navigate(['/']);
                return false;
            }
        }
        return false;
    }
}