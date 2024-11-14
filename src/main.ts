import { isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TODO_REDUCER_NODE, todoReducer } from './app/todo/store/todo/todo.reducer';
import { AppComponent } from './app/app.component';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { todoRoutes } from './app/todo/todo.routes';


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
