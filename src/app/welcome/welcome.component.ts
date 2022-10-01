/**
 * Modify this file to fetch and display the login details
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../types/user.type';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user: User = new User(); // type this variable using user.type.ts file
  userDetails: UserDetails[] = new Array();
  res: any;
  showUsers = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.user.username = this.route.snapshot.paramMap.get('username');
    this.setToken();
  }

  ngOnDestroy() {}

  logout() {
    this.user = new User();
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
  setToken() {
    this.user.token = JSON.parse(localStorage.getItem('currentUser')).token;
  }

  getUserInfo() {
    this.authenticationService
      .getUserList(this.user.token)
      .subscribe((data) => {
        this.res = data;
        for (var i = 0; i < this.res.data.length; i++) {
          this.userDetails.push(this.res.data[i]);
        }
      });
    this.showUsers = true;
  }
}

export interface UserDetails {
  id: number;
  name: string;
  year: number;
  color: any;
  pantone_value: any;
}
