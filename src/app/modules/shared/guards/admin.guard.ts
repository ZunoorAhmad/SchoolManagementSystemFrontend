import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { GlobalService } from "../services/global.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  isInitial: boolean = false;
  constructor(
    private global: GlobalService
  ) { }

  canActivate() {
    const currentUser: any = this.global.getStorage("userInfo");
    if (currentUser?.full_name || currentUser?.username && currentUser.role == "admin") {
      this.global.currentUser = currentUser;
      return true;
    } else {
      this.global.goToPage('auth/login');
      return false
    }
  }
}
