import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

bootstrapApplication(AppComponent, {
providers: [
provideRouter(routes),
provideAnimations(),
provideToastr(),
ConfirmationService,
importProvidersFrom(HttpClientModule)
]
}).catch(err => console.error(err));