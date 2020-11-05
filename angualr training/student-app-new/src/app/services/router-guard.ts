import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor(private authService:AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.authService.checkLoginStatus().pipe(map(data => {
            if(data){
                console.log("logged in");
                return true;
            }
            else{
                console.log("logged out");
                this.router.navigate(["/login"]);
                return false;
            }
        }));
    }
}