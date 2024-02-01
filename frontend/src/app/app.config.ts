import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideToastr(),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
};
