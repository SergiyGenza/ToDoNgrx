import { isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TODO_REDUCER_NODE, todoReducer } from './app/todo/store/todo/todo.reducer';
import { AppComponent } from './app/app.component';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { appRoutes } from './app/app.route';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'environment/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './app/todo/store/todo/todo.effects';


bootstrapApplication(AppComponent, {
    providers: [
    provideRouter(appRoutes),
    provideAngularSvgIcon(),
    provideHttpClient(),
    provideStore(),
    provideState({ name: TODO_REDUCER_NODE, reducer: todoReducer }),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
        connectInZone: true
    }),
    importProvidersFrom(BrowserModule, StoreModule.forRoot({}, {}), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true })),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
        provideEffects(TodoEffects)
]
}).catch(err => console.error(err));
