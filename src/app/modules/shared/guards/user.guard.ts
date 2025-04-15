import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { GlobalService } from "../services/global.service";
import { HttpService } from "../services/http.service";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserGuard implements CanActivate {
  isInitial: boolean = false;
  constructor(
    private global: GlobalService,
    private http: HttpService
  ) { }

  canActivate() {
    const currentUser: any = this.global.getStorage("userInfo");
    if (currentUser && currentUser.user_id) {
      this.http.get(environment.backend.baseURL + "users/" + currentUser.user_id + "/").then((res) => {
        this.global.setStorage("userInfo", res);
      })
    }
    if (currentUser?.full_name || currentUser?.username) {
      if (currentUser.role == 'user') {
        return true;
      } else if (currentUser.role == 'admin') {
        this.global.goToPage('admin/home');
      }
      return false;
    } else {
      this.global.goToPage('auth/login');
      return false
    }
  }
}
