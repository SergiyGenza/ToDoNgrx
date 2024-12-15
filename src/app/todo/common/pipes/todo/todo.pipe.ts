import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../models/category.model';
import { Folder } from '../../models/folder.model';
import { Todo } from '../../models/todo.model';

type ItemList = Todo[] | null;
type SearchItem = string | string[] | Category | Folder | null;
type Result = Todo[] | null;
type ItemType = 'folder' | 'category' | 'todo' | 'none';

@Pipe({
  name: 'todo',
  pure: true,
  standalone: true,
})
export class TodoPipe implements PipeTransform {
  transform(todoList: ItemList, todoSearchItem: SearchItem, itemType: ItemType = 'todo'): Result {
    if (itemType === 'category' && typeof todoSearchItem === 'object') {
      return todoList!.filter(todo => {
        if (!todo.currentFolderId) {
          return todo.currentCategoryId === (todoSearchItem as Category).id;
        }
        return;
      });
    } else if (itemType === 'folder') {
      return todoList!.filter(todo => {
        return todo!.currentFolderId === (todoSearchItem as Folder).id;
      })
    } else if (itemType === 'none') {
      return todoList!.filter(todo => {
        return todo.currentCategoryId == null;
      })
    }

    return todoList;
  }
}
