import { Injectable } from '@angular/core';
import { map, Observable, from, switchMap, catchError, throwError } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FTodo, TodoCreate } from '../models/todo.model';
import { FCategory } from '../models/category.model';
import { FFolder } from '../models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  todoRef: AngularFireList<any>;
  categoryRef: AngularFireList<any>;
  todo$: Observable<FTodo[]>;
  category$: Observable<FCategory[]>;

  constructor(private dataBase: AngularFireDatabase) {
    this.todoRef = this.dataBase.list('todoes');
    this.todo$ = this.todoRef.valueChanges();

    this.categoryRef = this.dataBase.list('category');
    this.category$ = this.categoryRef.valueChanges();
  }

  addTodo(todo: FTodo): Observable<void> {
    const key = this.todoRef.push(todo).key;
    if (key) {
      todo.key = key;
    }
    return from(this.todoRef.update(`/${key}`, todo));
  }

  addCategory(c: FCategory): Observable<void> {
    const key = this.categoryRef.push(c).key;
    if (key) {
      c.key = key;
    }
    return from(this.categoryRef.update(`/${key}`, c));
  }

  getTodo(key: string | undefined): Observable<FTodo | undefined> {
    return this.todo$.pipe(
      map((t) => t.find((t) => t.key === key))
    );
  }

  getCategory(key: string | undefined): Observable<FCategory | undefined> {
    return this.category$.pipe(
      map((categories) => categories.find((cat) => cat.key === key))
    );
  }


  getAllTodoes(): Observable<FTodo[]> {
    return this.todo$;
  }

  getAllCategories(): Observable<FCategory[]> {
    return this.category$;
  }

  updateTodo(key: string, data: any): Observable<void> {
    return from(this.todoRef.update(key, data));
  }

  updateCategory(key: string, data: any): Observable<void> {
    return from(this.categoryRef.update(key, data)); // Оновлює категорію за ключем
  }


  removeTodo(key: string): Observable<void> {
    return from(this.todoRef.remove(key));
  }

  removeCategory(key: string): Observable<void> {
    return from(this.categoryRef.remove(key));
  }

  private getCategoryFolders(categoryId: string): Observable<FFolder[]> {
    return this.dataBase.list<FFolder>(`category/${categoryId}/foldersList`).valueChanges();
  }

  addFolder(folder: FFolder, currentCategoryId: string): Observable<FFolder> {
    return this.getCategoryFolders(currentCategoryId).pipe(
      switchMap((currentFolders: FFolder[]) => {
        // Перевіряємо, чи папка вже існує
        const folderExists = currentFolders.some(existingFolder => existingFolder.name === folder.name);
        if (folderExists) {
          // Якщо папка вже існує, можна кинути помилку або просто повернути поточну папку
          return throwError(new Error('Folder already exists'));
        }

        // Додаємо нову папку до існуючих
        const updatedFolders = [...currentFolders, folder];
        // Оновлюємо категорію з новим списком папок
        return this.updateCategory(currentCategoryId, { foldersList: updatedFolders }).pipe(
          map(() => folder) // Повертаємо папку після успішного оновлення
        );
      }),
      catchError(error => {
        console.error('Error adding folder:', error);
        return throwError(error); // Повертаємо помилку
      })
    );
  }









}
