import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppMenuComponent } from "./app.menu.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    TableModule,
    AppMenuComponent
  ],
  template: `
<div class="flex h-screen">
<app-menu></app-menu>
<div class="content flex-1 p-4 overflow-auto">
<router-outlet></router-outlet>
</div>
</div>
`, styles: [`
    .flex { display: flex; }
    .flex-1 { flex: 1; }
    .p-4 { padding: 1rem; }
    .h-screen { height: 100vh; }
    .overflow-auto { overflow: auto; }
  `]
})
export class AppComponent { }
