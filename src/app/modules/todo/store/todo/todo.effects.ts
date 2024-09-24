import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { FirebaseService } from '../../common/services/firebase.service';
import { CreateFolderAction, CreateFolderFailure, CreateFolderSuccess, LoadCategoriesFailure, LoadCategoriesSuccess, LoadTodos, LoadTodosFailure, LoadTodosSuccess, TodoActions, todoActionsType, TodoCreateAction, TodoDeleteAction, TodoEditAction } from './todo.actions';
import { FFolder } from '../../common/models/folder.model';


@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService
  ) { }

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(todoActionsType.loadTodoFirebase),
    exhaustMap(() => this.firebaseService.getAllTodoes()
      .pipe(
        map(todos => new LoadTodosSuccess({ todos })),
        catchError(error => of(new LoadTodosFailure({ error })))
      ))
  ));

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActionsType.loadCategories),
      mergeMap(() =>
        this.firebaseService.getAllCategories().pipe(
          map(categories => new LoadCategoriesSuccess({ categories })),
          catchError(error => of(new LoadCategoriesFailure({ error })))
        )
      )
    )
  );

  createTodo$ = createEffect(() => this.actions$.pipe(
    ofType<TodoCreateAction>(todoActionsType.createTodo),
    exhaustMap(action =>
      this.firebaseService.addTodo(action.payload).pipe(
        map(() => new LoadTodos()),
        catchError(error => of(new LoadTodosFailure({ error })))
      )
    )
  ));

  deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType<TodoDeleteAction>(todoActionsType.deleteTodo),
    exhaustMap(action =>
      this.firebaseService.removeTodo(action.payload.id).pipe(
        map(() => new LoadTodos()),
        catchError(error => of(new LoadTodosFailure({ error })))
      )
    )
  ));

  editTodo$ = createEffect(() => this.actions$.pipe(
    ofType<TodoEditAction>(todoActionsType.editTodo),
    exhaustMap(action =>
      this.firebaseService.updateTodo(action.payload.id, { name: action.payload.name }).pipe(
        map(() => new LoadTodos()),
        catchError(error => of(new LoadTodosFailure({ error })))
      )
    )
  ));

  createFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateFolderAction>(todoActionsType.createFolder),
      tap(action => console.log('Creating folder:', action)),
      mergeMap(action =>
        this.firebaseService.addFolder(action.payload.folder, action.payload.currentCategoryId).pipe(
          map((folder: FFolder) =>
            new CreateFolderSuccess({ folder, currentCategoryId: action.payload.currentCategoryId })
          ),
          catchError(error => {
            console.error('Create folder failed', error);
            return of(new CreateFolderFailure({ error }));
          })
        )
      )
    )
  );






}
