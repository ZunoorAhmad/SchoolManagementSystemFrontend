import { Component } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    public global: GlobalService
  ) { }

  logout(){
    this.global.clearStorage();
    this.global.goToPage('auth/login');
  }

}
