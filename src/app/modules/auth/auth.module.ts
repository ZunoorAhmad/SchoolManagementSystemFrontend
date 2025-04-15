import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AppComponent } from '../../app.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    RippleModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AuthModule { }
