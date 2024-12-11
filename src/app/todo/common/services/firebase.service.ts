import { inject, Injectable } from '@angular/core';
import { child, get, getDatabase, push, ref, set, update } from 'firebase/database';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TFilter } from '../models/filters.model';
import { combineLatest, from, map, Observable } from 'rxjs';
import { Todo, TodoCreate } from '../models/todo.model';
import { TodoState } from '../../store/todo/todo.reducer';
import { Category, CategoryCreate } from '../models/category.model';
import { FFolder, Folder, FolderCreate } from '../models/folder.model';

const COLLECTION = "3unrLH8RmLZDVetu9mZ1ebRIqqm2"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // mb add UUID 
  auth = inject(AuthService);
  databaseInstance = getDatabase();

  dataRef = ref(this.databaseInstance, '/' + COLLECTION);

  // test data save
  public saveData(data: any, collection: string = COLLECTION) {
    set(ref(this.databaseInstance, `/` + collection), {
      ...data,
    })
      .then(() => {
        console.log(true);

      })
      .catch((error) => {
        console.log(false);
        console.error('Failed to save data: ', error);
      });
  }
  // test data save


  // TodoState ?????
  public getTodos(): Observable<TodoState> {
    return from(get((ref(this.databaseInstance, '/' + COLLECTION)))
      .then(data => {
        return data.val()
      }))
  }

  public createTodo(todo: TodoCreate): Observable<void> {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/todoList');
    const newTodoRef = push(dataRef);
    const updatedTodo = { ...todo, id: newTodoRef.key };

    return from(update(newTodoRef, updatedTodo)
      .then(() => {
        console.log('Todo created with ID:', newTodoRef.key);
      })
      .catch((error) => {
        console.error('Failed to createTodo: ', error);
        throw error;
      }));
  }

  public createCategory(category: CategoryCreate): Observable<void> {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/categoriesList');
    const newCatRef = push(dataRef);
    const updatedCat = { ...category, id: newCatRef.key };

    return from(update(newCatRef, updatedCat)
      .then(() => {
        console.log('Category created with ID:', newCatRef.key);
      })
      .catch((error) => {
        console.error('Failed to createCategory: ', error);
        throw error;
      }));
  }

  public createFolder(folder: FolderCreate) {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/categoriesList');

    get(dataRef).then((snapshot) => {
      const categories = snapshot.val();
      const categoryIndex = categories.findIndex((c: Category) => c.id == folder.currentCategoryId);

      if (categoryIndex !== -1) {
        const category: Category = categories[categoryIndex];
        const newFolderRef = push(child(dataRef, `${folder.currentCategoryId}/foldersList`));
        const newFolderId = newFolderRef.key;
        // change type Folder to FireFolder
        if (newFolderId) {
          const newFolder: Folder = {
            id: 999,
            ...folder
          };

          category.foldersList
            ? category.foldersList = [...category.foldersList, newFolder]
            : category.foldersList = [newFolder]

          const updates: any = {};
          updates[`/${COLLECTION}/categoriesList/${categoryIndex}/foldersList`] = category.foldersList;

          update(ref(this.databaseInstance), updates)
            .then(() => console.log('Folder created successfully'))
            .catch((err) => console.error('Error creating folder:', err));
        }
      } else {
        console.error('Category not found');
      }
    }).catch((err) => console.error('Error fetching categories:', err));
  }

  constructor() { }
}
