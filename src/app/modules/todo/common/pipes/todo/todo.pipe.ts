import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../models/category.model';
import { Folder } from '../../models/folder.model';
import { Todo } from '../../models/todo.model';

type Items = Todo[] | null | undefined;
type SearchItem = string | string[] | Category | Folder | null;
type Result = Todo[] | undefined | null;
@Pipe({
  name: 'todo',
  pure: true,
})
export class TodoPipe implements PipeTransform {
  transform(todoList: Items, todoSearchItem: SearchItem): Result {
    if (Array.isArray(todoSearchItem)) {
      return todoList?.filter(todo => {
        return todoSearchItem.includes(todo.name);
      })
    } else if (todoSearchItem === null) {
      return todoList?.filter(todo => {
        return todo.currentCategoryId == null;
      })
    } else if (typeof todoSearchItem === 'object' && 'foldersList' in todoSearchItem!) {
      return todoList?.filter(todo => {
        if (!todo.currentFolderId) {
          return todo.currentCategoryId === (todoSearchItem as Category).id;
        }
        return;
      });
    } else if (typeof todoSearchItem === 'object' && 'todoItems' in todoSearchItem!) {
      return todoList?.filter(todo => {
        console.log();
        
        return todo.currentFolderId === (todoSearchItem as Folder).id;
      });
    }
    return todoList;
  }
}
