import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../models/category.model';
import { Folder } from '../../models/folder.model';
import { Todo } from '../../models/todo.model';

type ItemList = Todo[] | null;
type SearchItem = string | string[] | Category | Folder | null;
type Result = Todo[] | null;

@Pipe({
  name: 'todo',
  pure: true,
  standalone: true,
})
export class TodoPipe implements PipeTransform {
  transform(todoList: ItemList, todoSearchItem: SearchItem): Result {
    if (Array.isArray(todoSearchItem)) {
      return todoList!.filter(todo => {
        return todoSearchItem.includes(todo.name);
      })
    } else if (todoSearchItem === null) {
      return todoList!.filter(todo => {
        return todo.currentCategoryId == null;
      })
    } else if (typeof todoSearchItem === 'object' && 'foldersList' in todoSearchItem!) {
      return todoList!.filter(todo => {
        if (!todo.currentFolderId) {
          return todo.currentCategoryId === (todoSearchItem as Category).id;
        }
        return;
      });
    } else if (typeof todoSearchItem === 'object' && 'todoItems' in todoSearchItem!) {
      return todoList!.filter(todo => {
        return todo.currentFolderId === (todoSearchItem as Folder).id;
      });
    }
    return todoList;
  }
}
