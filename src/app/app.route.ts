import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../app/todo/widgets/todo-widget/todo-widget.component').then((c) => c.TodoWidgetComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('../app/auth/auth/auth.component').then((c) => c.AuthComponent)
  }
]