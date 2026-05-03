import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from './services/auth.service';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [PanelMenuModule, RouterModule],
  template: `
    <div class="sidebar-menu">
      <div class="menu-header">
        <button class="logout-bell-btn" type="button" (click)="logout()">
          <i class="pi pi-bell"></i>
          <span>Logout</span>
        </button>
      </div>
      <p-panelMenu [model]="items" styleClass="green-menu"></p-panelMenu>
    </div>
  `,
  styles: [`
    .sidebar-menu {
      width: 250px;
      height: 100vh;
      background-color: #e8f5e9; /* light green background */
      padding-top: 1rem;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }

    .menu-header {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
    }

    .logout-bell-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.9rem 1.1rem;
      color: #ffffff;
      background: linear-gradient(135deg, #2e7d32, #43a047);
      border: none;
      border-radius: 999px;
      font-weight: 800;
      font-size: 1rem;
      box-shadow: 0 10px 25px rgba(46, 125, 50, 0.2);
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .logout-bell-btn i {
      font-size: 1.2rem;
    }

    .logout-bell-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 28px rgba(46, 125, 50, 0.25);
      background: linear-gradient(135deg, #43a047, #2e7d32);
    }

    .green-menu .p-panelmenu-header {
      background-color: #4caf50 !important; /* green header */
      color: #fff !important;
    }

    .green-menu .p-menuitem-link {
      color: #333;
    }

    .green-menu .p-menuitem-link:hover {
      background-color: #a5d6a7;
    }
  `]
})
export class AppMenuComponent {
  constructor(private router: Router, private authService: AuthService) {}

  items = [
    { label: 'Dashboard', icon: 'pi pi-home', command: () => this.router.navigate(['/dashboard']) },
    { label: 'Credit Application', icon: 'pi pi-credit-card', command: () => this.router.navigate(['/loan-application']) },
    { label: 'ESG Assessment', icon: 'pi pi-pencil', command: () => this.router.navigate(['/loan-applications']) },
    // { label: 'ESG Checklist', icon: 'pi pi-globe', command: () => this.router.navigate(['/esg-checklist']) }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
