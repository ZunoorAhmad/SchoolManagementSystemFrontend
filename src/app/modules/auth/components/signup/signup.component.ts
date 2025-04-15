import { Component, inject } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isSubmitted = false;
  fb = inject(FormBuilder);
  signupForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    public global: GlobalService,
    private http: HttpService
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: new FormControl(""),
        email: new FormControl("", [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ]),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      }
    );
  }

  get formControl() {
    return this.signupForm.controls;
  }

  forceLowercaseEmail() {
    const currentValue = this.signupForm.get('email')?.value;
    if (currentValue) {
      this.signupForm.get('email')?.setValue(currentValue.toLowerCase(), { emitEvent: false });
    }
  }

  submitForm() {
    if (this.signupForm.value.password.length < 6) {
      this.global.alertBox('Alert', 'Password Should be min 6 characters');
      return;
    };
    if (this.signupForm.value.password != this.signupForm.value.confirmPassword) {
      this.global.alertBox('Alert', 'Password and Confirm password must be same');
      return
    }
    const signupObj = { name: this.signupForm.value.fullName, email: this.signupForm.value.email, passwordHash: this.signupForm.value.password };
    this.http
      .post(environment.backend.baseURL + 'auth/register', signupObj)
      .then((res: { token: string }) => {
        this.global.setStorage('token', res.token);
        this.global.showToast("success", "Successfully", "User Registered successfully");
        this.global.goToPage('/main/students-listing');
      })
  }
}