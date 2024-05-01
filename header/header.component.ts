import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchTerm: string = '';

  constructor(private router: Router) { }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      // Navigate to the student component with the search term as a query parameter
      this.router.navigate(['/search'], { queryParams: { searchTerm: this.searchTerm } });
    }
  }
}

