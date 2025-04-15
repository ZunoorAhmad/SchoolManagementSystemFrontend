import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileType: string = '';

  ngOnInit(): void {
    // Sample profile type - replace with actual user data later
    this.profileType = 'Admin';
  }
}