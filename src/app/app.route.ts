import { Route } from "@angular/router";
import { authGuard } from "./shared/common/guards/auth.guard";

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../app/todo/widgets/todo-widget/todo-widget.component').then((c) => c.TodoWidgetComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('../app/auth/auth/auth.component').then((c) => c.AuthComponent)
  }
]