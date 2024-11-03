import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TODO_REDUCER_NODE, TodoState } from "./todo.reducer";

export const todoFeatureSelector = createFeatureSelector<TodoState>(TODO_REDUCER_NODE)

export const todoListSelector = createSelector(
  todoFeatureSelector,
  state => state.todoList
)
export const categoriesListSelector = createSelector(
  todoFeatureSelector,
  state => state.categoriesList
)
export const favouriteFiltersSelector = createSelector(
  todoFeatureSelector,
  state => state.filters.favourite
)
export const priorityFiltersSelector = createSelector(
  todoFeatureSelector,
  state => state.filters.priority
)
export const filtersSelector = createSelector(
  todoFeatureSelector,
  state => state.filters
)