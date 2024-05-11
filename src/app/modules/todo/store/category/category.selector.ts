import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CATEGORY_REDUCER_NODE, CategoryState } from "./category.reducer";

export const categoryFeatureSelector = createFeatureSelector<CategoryState>(CATEGORY_REDUCER_NODE)

export const categoryListSelector = createSelector(
  categoryFeatureSelector,
  state => state.categoryList
)