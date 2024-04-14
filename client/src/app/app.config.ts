import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { httpInterceptor } from './interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide:HTTP_INTERCEPTORS,
        useClass:httpInterceptor,
        multi:true
    },
    provideClientHydration(),
    provideAnimations(),

    importProvidersFrom(MatNativeDateModule),
    //here we add provideHttpClient()
    // provideHttpClient(),

  ],
};
