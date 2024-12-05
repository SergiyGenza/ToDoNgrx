import { Route } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

export const authRoutes: Route[] = [
  {
    path: 'auth',
    component: AuthComponent,
    // loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  }
]