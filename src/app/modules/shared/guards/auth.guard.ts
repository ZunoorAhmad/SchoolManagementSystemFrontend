import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { GlobalService } from "../services/global.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  isInitial: boolean = false;
  constructor(
    private global: GlobalService
  ) { }

  canActivate() {
    const currentUser: any = this.global.getStorage("userInfo");
    if (currentUser?.full_name || currentUser?.username) {
      return false;
    } else {
      if(currentUser){
        if(currentUser.role == "user"){
          this.global.goToPage('main/home');
        }else if(currentUser.fole =='admin'){
          this.global.goToPage('admin/home');
        }
      }
      return false
    }
  }
}
