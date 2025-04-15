import { Component } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { GlobalService } from '../../../shared/services/global.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(
    private http: HttpService,
    public global: GlobalService
  ) { }

  submitForm() {
    if (!this.email) {
      this.global.alertBox('Alert!', "Enter Email");
      return;
    }
    if (!this.password) {
      this.global.alertBox('Alert!', "Enter Password");
      return;
    }
    const headers = {
      'Content-Type': 'application/json',
    };
    this.http
      .post(environment.backend.baseURL + 'auth/login', { email: this.email, passwordHash: this.password }, headers)
      .then((res: { token: string }) => {
        this.global.setStorage('token', res.token);
        this.password = "";
        this.email = "";
        this.global.goToPage('/main/dashboard');
        this.global.showToast("success", "Successfully", "User Login successfully");
      }, (err) => {
        this.global.alertBox('Alert!', "User name or password not matched");
      }).catch((error) => {
        this.global.alertBox('Alert!', "User name or password not matched");
      });
  }
}
