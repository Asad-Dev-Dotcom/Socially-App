import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  // isLoggedIn: boolean = false;
  user: any;
  dropdownOpen = false
  photo : any;

  constructor(private router: Router, private service : AuthService) {}

  ngOnInit(): void {

      const token = localStorage.getItem('token');
      if (token) {
        const data = this.service.decodeToken(token)
        this.user = data
        // this.isLoggedIn = true;
        // this.service.setUser(data);
      }
  }




  toggleDropdown(event : MouseEvent){
    event.stopPropagation()
    this.dropdownOpen = !this.dropdownOpen
  }

  logout(event : MouseEvent) {
    event.stopPropagation()
    localStorage.clear()
    // this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  @HostListener('document:click')
    closeDropdown() {
      this.dropdownOpen = false;
    }

}
