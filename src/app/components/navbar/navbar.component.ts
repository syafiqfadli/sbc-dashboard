import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  hamburgerOpen: boolean = false;

  constructor(private router: Router) { }

  handleHamburger() {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  navigateRoute(route: string) {
    this.router.navigate([`/${route}`]);
    this.hamburgerOpen = false;
  }
}
