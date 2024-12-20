import { Category } from "../../common/models/category.model";
import { TFilter } from "../../common/models/filters.model";
import { Folder } from "../../common/models/folder.model";
import { Todo } from "../../common/models/todo.model";
import { TodoActions, todoActionsType } from "./todo.actions";

export const TODO_REDUCER_NODE = 'todo';

export interface TodoState {
  idIncrement: number;
  todoList: Todo[];
  categoriesList: Category[];
  filters: TFilter;
  activeCategory: Category | null;
  formType: 'category' | 'folder' | 'todo';
}

export const initialTodoState: TodoState = {
  idIncrement: 1,
  todoList: [],
  categoriesList: [],
  filters: {
    favourite: false,
    priority: false,
    status: false,
    alphabeticalSort: false
  },
  activeCategory: null,
  formType: 'category'
}

export const todoReducer = (state = initialTodoState, action: TodoActions): TodoState => {
  switch (action.type) {
    case todoActionsType.createTodo:
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        todoList: [
          ...state.todoList,
          {
            id: state.idIncrement,
            name: action.payload.name,
            currentFolderId: action.payload.currentFolderId,
            currentCategoryId: action.payload.currentCategoryId,
            date: action.payload.date,
            completed: false,
            favourite: false,
            priority: 'none',
          } as Todo
        ]
      };
    case todoActionsType.deleteTodo:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id != action.payload.id)
      };
    case todoActionsType.toggleTodo:
      return {
        ...state,
        todoList: state.todoList.map(todo => todo.id === action.payload.id ? {
          ...todo,
          completed: !todo.completed,
        } : todo)
      }
    case todoActionsType.editTodo:
      return {
        ...state,
        todoList: state.todoList.map(todo => todo.id === action.payload.id ? {
          ...todo,
          name: action.payload.name
        } : todo)
      };
    case todoActionsType.loadTodo:
      return {
        ...action.payload.state
      }
    case todoActionsType.createCategory:
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        categoriesList: [
          ...state.categoriesList,
          {
            id: state.idIncrement,
            name: action.payload.name,
            foldersList: [],
          } as Category
        ]
      }
    case todoActionsType.editCategory:
      return {
        ...state,
        categoriesList: state.categoriesList.map(c => c.id === action.payload.id ? {
          ...c,
          name: action.payload.name
        } : c)
      }
    case todoActionsType.deleteCategory:
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.currentCategoryId === action.payload.id
            ? { ...todo, currentCategoryId: null, currentFolderId: null }
            : todo
        ),
        categoriesList: state.categoriesList.filter(cat => cat.id !== action.payload.id)
      }
    case todoActionsType.createFolder:
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        categoriesList: state.categoriesList.map(category => category.id === action.payload.currentCategoryId ? {
          ...category,
          foldersList: [
            ...category.foldersList,
            {
              id: state.idIncrement,
              name: action.payload.folderName,
              favourite: false,
              todoItems: [],
              currentCategoryId: action.payload.currentCategoryId
            } as Folder
          ]
        } : category)
      }
    case todoActionsType.editFolder:
      return {
        ...state,
        categoriesList: state.categoriesList.map(cat => {
          return {
            ...cat,
            foldersList: cat.foldersList.map(f => f.id === action.payload.id ? {
              ...f,
              name: action.payload.name
            } : f)
          }
        })
      }
    case todoActionsType.deleteFolder:
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.currentFolderId === action.payload.id
            ? { ...todo, currentFolderId: null }
            : todo
        ),
        categoriesList: state.categoriesList.map(cat => {
          return {
            ...cat,
            foldersList: cat.foldersList.filter(folder => folder.id !== action.payload.id)
          };
        })
      };
    case todoActionsType.deleteFolderWithAllItems:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.currentFolderId !== action.payload.id),
        categoriesList: state.categoriesList.map(cat => {
          return {
            ...cat,
            foldersList: cat.foldersList.filter(folder => folder.id !== action.payload.id)
          };
        })
      }
    case todoActionsType.deleteCategoryWithAllItems:
      return {
        ...state,
        todoList: state.todoList.filter(todo =>
          todo.currentCategoryId !== action.payload.id
        ),
        categoriesList: state.categoriesList.filter(cat => cat.id !== action.payload.id)
      }
    case todoActionsType.changeTodoPriority:
      return {
        ...state,
        todoList: state.todoList.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              priority: action.payload.priority
            };
          }
          return todo;
        })
      };
    case todoActionsType.toggleTodoFavouriteStatus:
      return {
        ...state,
        todoList: state.todoList.map(todo => todo.id === action.payload.id ? {
          ...todo,
          favourite: !todo.favourite,
        } : todo)
      };
    case todoActionsType.toggleFavouriteFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          favourite: !state.filters.favourite,
        }
      };
    case todoActionsType.togglePriorityFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          priority: !state.filters.priority,
        }
      };
    case todoActionsType.toggleStatusFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          status: !state.filters.status,
        }
      };
    case todoActionsType.toggleAlphabeticaSortFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          alphabeticalSort: !state.filters.alphabeticalSort
        }
      };
    case todoActionsType.changeActiveCategory:
      return {
        ...state,
        activeCategory: action.payload.activeCategory
      };
    case todoActionsType.changeFormType:
      return {
        ...state,
        formType: action.payload.formType
      }
    default:
      return state
  }
}
