import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_INITIALIZER } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { AppConfigService } from './app/services/app-config.service';
import { HttpErrorInterceptor } from './app/interceptors/http-error-interceptor';

export function initApp(config: AppConfigService) {
  return () => config.loadConfig();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppConfigService],
      multi: true
    },

    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    ConfirmationService,

    // 👇 REGISTER CLASS INTERCEPTOR VIA DI
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));
