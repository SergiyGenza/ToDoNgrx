import { FormControl } from "@angular/forms";

export interface CategoryForm {
  name: FormControl<string>;
}

export interface FolderForm {
  name: FormControl<string>;
  currentCategoryId: FormControl<number | null>;
}

export interface TodoForm {
  name: FormControl<string>;
  currentCategoryId: FormControl<number | null>;
  currentFolderId: FormControl<number | null>;
}