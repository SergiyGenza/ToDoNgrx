import { inject, Injectable } from '@angular/core';
import { child, get, getDatabase, push, ref, remove, set, update } from 'firebase/database';
import { AuthService } from 'src/app/auth/services/auth.service';
import { from, Observable } from 'rxjs';
import { Todo, TodoCreate } from '../models/todo.model';
import { TodoState } from '../../store/todo/todo.reducer';
import { Category, CategoryCreate } from '../models/category.model';
import { FolderCreate } from '../models/folder.model';
import { TPriority } from '../models/priority.model';

const COLLECTION = "3unrLH8RmLZDVetu9mZ1ebRIqqm2"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AuthService);
  databaseInstance = getDatabase();
  dataRef = ref(this.databaseInstance, '/' + COLLECTION);

  constructor() { }

  // test data save
  public saveTestData(data: any, collection: string = COLLECTION) {
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
  public getAllDataFromCollecton(): Observable<TodoState> {
    return from(get((ref(this.databaseInstance, '/' + COLLECTION)))
      .then(data => {
        return data.val()
      }))
  }

  public createFireTodo(todo: TodoCreate): Observable<void> {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/todoList');
    const newTodoRef = push(dataRef);
    const updatedTodo = { ...todo, id: newTodoRef.key };

    return from(
      set(newTodoRef, updatedTodo)
        .then(() => {
          console.log('Todo created with ID:', newTodoRef.key);
        })
        .catch((error) => {
          console.error('Failed to create todo: ', error);
          throw error;
        })
    );
  }

  public getFireTodo() {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/todoList');

    return from(get(dataRef)
      .then(data => {
        return data.val()
      }))
  }

  public createFireCategory(newCategory: CategoryCreate): Observable<void> {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/categoriesList');
    const newCatRef = push(dataRef);
    const updatedCat = { ...newCategory, id: newCatRef.key };

    return from(
      set(newCatRef, updatedCat)
        .then(() => {
          console.log('Category created with ID:', newCatRef.key);
        })
        .catch((error) => {
          console.error('Failed to create category: ', error);
          throw error;
        })
    );
  }

  public getFireCategories() {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/categoriesList');

    return from(get(dataRef)
      .then(data => {
        return data.val()
      }))
  }

  public createFireFolder(folder: FolderCreate): void {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/categoriesList');

    get(dataRef).then((snapshot) => {
      const categories: { [key: string]: Category } = snapshot.val() || {};
      const categoryKey = Object.keys(categories).find(key => categories[key].id == folder.currentCategoryId);

      if (categoryKey) {
        const categoryRef = child(dataRef, `${categoryKey}/foldersList`);
        const newFolderRef = push(categoryRef);
        const newFolderId = newFolderRef.key;

        if (newFolderId) {
          const newFolder = {
            id: newFolderId,
            ...folder
          };

          set(newFolderRef, newFolder)
            .then(() => console.log('Folder created successfully'))
            .catch((err) => console.error('Error creating folder:', err));
        }
      } else {
        console.error('Category not found');
      }
    }).catch((err) => console.error('Error fetching categories:', err));
  }

  // to do
  public editCategory(updatedCategory: Category) {
    const dataRef = ref(this.databaseInstance, `/${COLLECTION}/categoriesList`);

    get(dataRef).then((snapshot) => {
      const categories = snapshot.val();
      const categoryKey = Object.keys(categories).find(key => categories[key].id === updatedCategory.id);

      if (categoryKey) {
        const categoryRef = ref(this.databaseInstance, `/${COLLECTION}/categoriesList/${categoryKey}`);

        update(categoryRef, updatedCategory)
          .then(() => {
            console.log('Category updated successfully');
          })
          .catch((err) => {
            console.error('Error updating category:', err);
          });
      } else {
        console.error('Category not found');
      }
    }).catch((err) => {
      console.error('Error fetching categories:', err);
    });
  }

  public editFolderInCategory(updatedFolder: any): void {
    const dataRef = ref(this.databaseInstance, '/' + COLLECTION + '/categoriesList');

    get(dataRef).then((snapshot) => {
      const categoriesObj = snapshot.val();
      const categories: Category[] = Object.values(categoriesObj);
      const category = categories.find((c: Category) => c.id === updatedFolder.currentCategoryId);

      if (category) {
        const folderIndex = category.foldersList.findIndex(f => f.id === updatedFolder.id);
        if (folderIndex !== -1) {
          category.foldersList[folderIndex] = {
            ...category.foldersList[folderIndex],
            ...updatedFolder
          };
          const updates: any = {};
          updates[`/${COLLECTION}/categoriesList/${category.id}/foldersList/${folderIndex}`] = category.foldersList[folderIndex];

          update(ref(this.databaseInstance), updates)
            .then(() => console.log('Folder updated successfully'))
            .catch((err) => console.error('Error updating folder:', err));
        } else {
          console.error('Folder not found');
        }
      } else {
        console.error('Category not found');
      }
    }).catch((err) => console.error('Error fetching categories:', err));
  }

  public editTodo(updateTodo: Todo) {
    const dataRef = ref(this.databaseInstance, `/${COLLECTION}/todoList`);

    get(dataRef).then((snapshot) => {
      const todos = snapshot.val();
      const todoKey = Object.keys(todos).find(key => todos[key].id === updateTodo.id);

      if (todoKey) {
        const todoRef = ref(this.databaseInstance, `/${COLLECTION}/todoList/${todoKey}`);

        update(todoRef, updateTodo)
          .then(() => {
            console.log('Todo updated successfully');
          })
          .catch((err) => {
            console.error('Error updating todo:', err);
          });
      } else {
        console.error('Todo not found');
      }
    })
  }

  public updateTodoPriorityStatus(todoId: string, newPriority: TPriority): void {
    const dataRef = ref(this.databaseInstance, `/${COLLECTION}/todoList`);

    get(dataRef).then((snapshot) => {
      const todos = snapshot.val();
      const todoKey = Object.keys(todos).find(key => todos[key].id === todoId);

      if (todoKey) {
        const priorityRef = ref(this.databaseInstance, `/${COLLECTION}/todoList/${todoKey}/priority`);

        set(priorityRef, newPriority)
          .then(() => {
            console.log('Todo priority updated successfully');
          })
          .catch((err) => {
            console.error('Error updating todo priority:', err);
          });
      } else {
        console.error('Todo not found');
      }
    }).catch((err) => {
      console.error('Error fetching todos:', err);
    });
  }

  public toggleTodoFavouriteStatus(todoId: any): void {
    const dataRef = ref(this.databaseInstance, `/${COLLECTION}/todoList`);

    get(dataRef).then((snapshot) => {
      const todos = snapshot.val();
      const todoKey = Object.keys(todos).find(key => todos[key].id === todoId);

      if (todoKey) {
        const currentFavouriteStatus = todos[todoKey].favourite;
        const newFavouriteStatus = !currentFavouriteStatus;
        const favouriteRef = ref(this.databaseInstance, `/${COLLECTION}/todoList/${todoKey}/favourite`);

        set(favouriteRef, newFavouriteStatus)
          .then(() => {
            console.log('Todo favourite status updated successfully');
          })
          .catch((err) => {
            console.error('Error updating todo favourite status:', err);
          });
      } else {
        console.error('Todo not found');
      }
    }).catch((err) => {
      console.error('Error fetching todos:', err);
    });
  }

  public deleteTodo(todoId: string): void {
    const dataRef = ref(this.databaseInstance, `/${COLLECTION}/todoList`);

    get(dataRef).then((snapshot) => {
      const todos = snapshot.val();
      const todoKey = Object.keys(todos).find(key => todos[key].id === todoId);

      if (todoKey) {
        const todoRef = ref(this.databaseInstance, `/${COLLECTION}/todoList/${todoKey}`);

        remove(todoRef)
          .then(() => {
            console.log('Todo deleted successfully');
          })
          .catch((err) => {
            console.error('Error deleting todo:', err);
          });
      } else {
        console.error('Todo not found');
      }
    }).catch((err) => {
      console.error('Error fetching todos:', err);
    });
  }

  public deleteCategoryAndTodos(categoryId: any): void {
    const dataRef = ref(this.databaseInstance, `/${COLLECTION}/categoriesList`);
    const todoListRef = ref(this.databaseInstance, `/${COLLECTION}/todoList`);

    get(dataRef).then((snapshot) => {
      const categories = snapshot.val();
      const categoryKey = Object.keys(categories).find(key => categories[key].id === categoryId);

      if (categoryKey) {
        const categoryRef = ref(this.databaseInstance, `/${COLLECTION}/categoriesList/${categoryKey}`);
        remove(categoryRef).then(() => {
          console.log('Category deleted successfully');

          get(todoListRef).then((todoSnapshot) => {
            const todos = todoSnapshot.val();
            const todosToDelete = Object.keys(todos).filter(todoKey => todos[todoKey].currentCategoryId === categoryId);

            todosToDelete.forEach((todoKey) => {
              const todoRef = ref(this.databaseInstance, `/${COLLECTION}/todoList/${todoKey}`);
              remove(todoRef).then(() => {
                console.log(`Todo with ID ${todoKey} deleted successfully`);
              }).catch((err) => console.error(`Error deleting todo ${todoKey}:`, err));
            });
          }).catch((err) => console.error('Error fetching todos:', err));
        }).catch((err) => {
          console.error('Error deleting category:', err);
        });
      } else {
        console.error('Category not found');
      }
    }).catch((err) => console.error('Error fetching categories:', err));
  }

  public clearCategoryReferences(categoryId: any): void {
    const dataRef = ref(this.databaseInstance, `/${COLLECTION}/categoriesList`);
    const todoListRef = ref(this.databaseInstance, `/${COLLECTION}/todoList`);

    get(dataRef).then((snapshot) => {
      const categories = snapshot.val();
      const categoryKey = Object.keys(categories).find(key => categories[key].id === categoryId);

      if (categoryKey) {
        console.log('Category found, clearing references in todos');

        get(todoListRef).then((todoSnapshot) => {
          const todos = todoSnapshot.val();

          Object.keys(todos).forEach((todoKey) => {
            if (todos[todoKey].currentCategoryId === categoryId) {
              const todoRef = ref(this.databaseInstance, `/${COLLECTION}/todoList/${todoKey}`);
              update(todoRef, {
                currentCategoryId: null,
                currentFolderId: null
              }).then(() => {
                console.log(`Cleared references for todo with ID ${todoKey}`);
              }).catch((err) => console.error(`Error clearing references for todo ${todoKey}:`, err));
            }
          });
        }).catch((err) => console.error('Error fetching todos:', err));
      } else {
        console.error('Category not found');
      }
    }).catch((err) => console.error('Error fetching categories:', err));
  }


}
