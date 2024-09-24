
import { Category } from "../../common/models/category.model";
import { CategoryActions, categoryActionsType } from "./category.actions";

export const CATEGORY_REDUCER_NODE = 'category';

export interface CategoryState {
  idIncrement: number;
  categoryList: Array<Category>;
}

export const initialCategoryState: CategoryState = {
  idIncrement: 1,
  categoryList: [{
    id: 'someId',
    name: 'Some',
    foldersList: [],
  }],
}

export const categoryReducer = (state = initialCategoryState, action: CategoryActions) => {
  // let some = state
  // switch (action.type) {
  //   case categoryActionsType.create:
  //     console.log('works');
  //     console.log(state.categoryList);

  //     return {
  //       ...some,
  //       idIncrement: some.idIncrement + 1,
  //       categoryList: [
  //         ...some.categoryList,
  //         {
  //           id: some.idIncrement,
  //           name: action.payload.name,
  //         }
  //       ]
  //     }
  //   case categoryActionsType.edit:
  //     return {
  //       ...some,
  //       categoryList: some.categoryList.map(item => item.id === action.payload.id ? {
  //         ...item,
  //         name: action.payload.name
  //       } : item)
  //     };
  //   case categoryActionsType.delete:
  //     return {
  //       ...some,
  //       categoryList: some.categoryList.filter(item => item.id != action.payload.id)
  //     };
  //   case categoryActionsType.load:

  //     console.log('load', state);

  //     return {
  //       ...action.payload.state
  //     };
  //   default:
  //     return some
  // }
}