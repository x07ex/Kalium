import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../service/admin.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private adminService: AdminService) {}
  canActivate(): any {
    const access: any = this.adminService.isAuth();
    if (!access) {
      this.router.navigate(["login"]);
    }
    return true;
  }
}
