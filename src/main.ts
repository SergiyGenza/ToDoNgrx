import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { todoRoutes } from './app/modules/todo/todo.routes';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';
import { TODO_REDUCER_NODE, todoReducer } from './app/modules/todo/store/todo/todo.reducer';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, StoreModule.forRoot({}, {}), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true })),
        provideRouter(todoRoutes),
        provideAngularSvgIcon(),
        provideHttpClient(),
        provideStore(),
        provideState({ name: TODO_REDUCER_NODE, reducer: todoReducer }),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectInZone: true // If set to true, the connection is established within the Angular zone
        })
    ]
}).catch(err => console.error(err));
