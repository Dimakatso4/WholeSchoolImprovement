import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  if (window) {
    window['log'] = console.log;
    window['error'] = console.error;
    window['debug'] = console.debug;
}

console.log = console.debug = console.error = () => { };

}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
