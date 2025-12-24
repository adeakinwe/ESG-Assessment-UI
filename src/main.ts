import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { AppConfigService } from './app/services/app-config.service';

export function initApp(config: AppConfigService) {
    return () => config.loadConfig();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
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
        importProvidersFrom(HttpClientModule)
    ]
}).catch(err => console.error(err));