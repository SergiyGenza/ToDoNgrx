import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import { GetDataFromFirebase, TodoActions, todoActionsType, TodoCreateAction, TodoLoadStateAction, ToogleProirityFilter, ToogleProirityFilterF } from './todo.actions';
import { FirebaseService } from '../../common/services/firebase.service';
import { TodoState } from './todo.reducer';
import { Store } from '@ngrx/store';
import { TFilter } from '../../common/models/filters.model';

@Injectable({
  providedIn: 'root'
})
export class TodoEffects {
  private firebaseService = inject(FirebaseService);

  constructor(
    // private todoActions$: TodoActions,
    private actions: Actions,
    private todoStore$: Store<TodoState>,
  ) { }

  // togglePriorityFilter$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(ToogleProirityFilterF),
  //     switchMap(() =>        
  //       this.todoStore$.select('filters').pipe(
  //         switchMap((filters: TFilter) =>
  //           this.firebaseService.priorityFilterToggle(filters).pipe(
  //             switchMap(() => of({ type: '[Filter] Toggle Priority Filter Success' })),
  //             catchError((error) => of({ type: '[Filter] Toggle Priority Filter Failure', error }))
  //           )
  //         )
  //       )
  //     )
  //   )
  // );

  // getData$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(GetDataFromFirebase),
  //     mergeMap((acton) => {
  //       return this.firebaseService.getTodos().pipe(
  //         map((res) => {
  //           return res
  //         })
  //       )
  //     })
  //   )
  // )
  getData$ = createEffect(() =>
    this.actions.pipe(
      ofType(GetDataFromFirebase),
      exhaustMap(() => this.firebaseService.getAllDataFromCollecton()
        .pipe(
          map((res) => new TodoLoadStateAction({ state: res }))
        )
      )
    )
  )

  // createTodo$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(TodoCreateAction),
  //     exhaustMap(() => this.)
  //   )
  // )

  // togglePriorityFilter$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(ToogleProirityFilterF),
  //     mergeMap((action) => {
  //       return this.firebaseService.priorityFilterToggle(action.filter)
  //     })
  //   )
  // )

}