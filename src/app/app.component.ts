import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AppMenuComponent } from "./app.menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AppMenuComponent
  ],
  template: `
    <div class="flex h-screen">
      <app-menu *ngIf="authService.isAuthenticated()"></app-menu>
      <div class="content flex-1 p-4 overflow-auto" [class.full-width]="!authService.isAuthenticated()">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .flex { display: flex; }
    .flex-1 { flex: 1; }
    .p-4 { padding: 1rem; }
    .h-screen { height: 100vh; }
    .overflow-auto { overflow: auto; }
    .full-width { margin-left: 0; }
  `]
})
export class AppComponent {
  authService = inject(AuthService);
}
