import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../components/admin/admin-navbar/admin-navbar.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin',
  imports: [AdminNavbarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
