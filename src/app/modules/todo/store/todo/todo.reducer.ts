import { Category } from "../../models/category.model";
import { Todo } from "../../models/todo.model";
import { TodoActions, todoActionsType } from "./todo.actions";

export const TODO_REDUCER_NODE = 'todo';

export interface TodoState {
  idIncrement: number;
  todoList: Todo[];
  categoriesList: Category[]
}

export const initialTodoState: TodoState = {
  idIncrement: 1,
  todoList: [],
  categoriesList: [],
}

export const todoReducer = (state = initialTodoState, action: TodoActions) => {
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
            completed: false,
            currentFolderName: '',
            currentCategoryName: action.payload.currentCategoryName,
          }
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
          }
        ]
      }
    case todoActionsType.createFolder:
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        categoriesList: state.categoriesList.map(category => category.name === action.payload.categoryName ? {
          ...category,
          foldersList: [
            ...category.foldersList,
            {
              id: state.idIncrement,
              name: action.payload.folderName,
              favourite: false,
              todoItems: [],
            }]
        } : category)

      }
    case todoActionsType.deleteFolder:
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.currentFolderName === action.payload.name
            ? { ...todo, currentFolderName: '' }
            : todo
        ),
        categoriesList: state.categoriesList.map(cat => {
          return {
            ...cat,
            foldersList: cat.foldersList.filter(folder => folder.id !== action.payload.id)
          };
        })
      };
    // case todoActionsType.deleteCategory:
    //   return {
    //     ...state,
    //     todoList: state.todoList.map(todo =>
    //       todo.currentCategoryName === action.payload.name
    //         ? { ...todo, currentCategoryName: '' }
    //         : todo
    //     ),
    //     categoriesList: state.categoriesList.map()
    //   }
    default:
      return state
  }
}