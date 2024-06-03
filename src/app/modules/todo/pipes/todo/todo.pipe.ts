import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { Category } from '../../models/category.model';
import { Folder } from '../../models/folder.model';

@Pipe({
  name: 'todo',
  pure: true,
})
export class TodoPipe implements PipeTransform {
  transform(todoList: Todo[] | null | undefined, todoSearchItem: string | string[] | Category | Folder): Todo[] | undefined | null {
    if (Array.isArray(todoSearchItem)) {
      return todoList?.filter(todo => {
        return todoSearchItem.includes(todo.name);
      })
    } else if (todoSearchItem === 'all') {
      return todoList?.filter(todo => {
        return todo.currentCategoryName! == 'all';
      })
    } else if (typeof todoSearchItem === 'object' && 'foldersList' in todoSearchItem) {
      return todoList?.filter(todo => {
        if (!todo.currentFolderName) {
          return todo.currentCategoryName === (todoSearchItem as Category).name;
        }
        return;
      });
    } else if (typeof todoSearchItem === 'object' && 'todoItems' in todoSearchItem) {
      return todoList?.filter(todo => {
        return todo.currentFolderName === (todoSearchItem as Folder).name;
      });
    }
    return todoList;
  }
}
