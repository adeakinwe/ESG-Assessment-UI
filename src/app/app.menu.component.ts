import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [PanelMenuModule, RouterModule],
  template: `
    <div class="sidebar-menu">
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
constructor(private router: Router) {}

items = [
  { label: 'Dashboard', icon: 'pi pi-home', command: () => this.router.navigate(['/dashboard']) },
  { label: 'Credit Application', icon: 'pi pi-credit-card', command: () => this.router.navigate(['/loan-application']) },
  { label: 'ESG Assessment', icon: 'pi pi-pencil', command: () => this.router.navigate(['/loan-applications']) },
  // { label: 'ESG Checklist', icon: 'pi pi-globe', command: () => this.router.navigate(['/esg-checklist']) }
];
}